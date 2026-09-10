import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const libraryPath = join(projectRoot, "content", "video-library.json");
const studioPath = join(projectRoot, "tools", "video-studio.html");
const uploadRoot = join(projectRoot, "public", "commerce-videos", "uploads");
const publicRoot = join(projectRoot, "public");
const host = "127.0.0.1";
const port = Number(process.env.VIDEO_STUDIO_PORT || 4317);
const maxUploadBytes = 95 * 1024 * 1024;
let publishing = false;

function json(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(value));
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 2 * 1024 * 1024) throw new Error("内容数据超过 2MB 限制");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function validateLibrary(value) {
  if (!value || !Array.isArray(value.categories) || !value.categories.length) {
    throw new Error("至少保留一个视频分类");
  }
  const slugs = new Set();
  for (const category of value.categories) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug || "")) {
      throw new Error(`分类路径“${category.slug || "空值"}”只能使用小写字母、数字和短横线`);
    }
    if (slugs.has(category.slug)) throw new Error(`分类路径“${category.slug}”重复`);
    slugs.add(category.slug);
    if (!category.title?.trim()) throw new Error("每个分类都需要标题");
    if (!Array.isArray(category.covers) || category.covers.length !== 2) throw new Error(`${category.title}需要两张封面图`);
    if (!Array.isArray(category.videos)) throw new Error(`${category.title}的视频列表格式错误`);
    const ids = new Set();
    for (const video of category.videos) {
      if (!video.id || ids.has(video.id)) throw new Error(`${category.title}存在重复或为空的视频 ID`);
      ids.add(video.id);
      if (!video.title?.trim()) throw new Error(`${category.title}中有视频缺少标题`);
      if (!video.src?.trim()) throw new Error(`${video.title}尚未选择视频文件`);
    }
  }
}

function safeName(name) {
  const extension = extname(name).toLowerCase();
  const base = name.slice(0, Math.max(0, name.length - extension.length))
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56) || "media";
  return `${Date.now()}-${base}${extension}`;
}

async function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectRoot, env, windowsHide: true, shell: false });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk.toString(); });
    child.stderr.on("data", (chunk) => { output += chunk.toString(); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(`${command} 执行失败（${code}）\n${output.slice(-5000)}`));
    });
  });
}

async function publish() {
  if (publishing) throw new Error("发布正在进行中");
  publishing = true;
  try {
    if (process.platform === "win32") {
      await run(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", "pnpm.cmd exec next build"], { ...process.env, GITHUB_PAGES: "true" });
    } else {
      await run("pnpm", ["exec", "next", "build"], { ...process.env, GITHUB_PAGES: "true" });
    }
    await run("git", ["add", "content/video-library.json", "public/commerce-videos"]);
    let hasChanges = true;
    try {
      await run("git", ["diff", "--cached", "--quiet"]);
      hasChanges = false;
    } catch {
      hasChanges = true;
    }
    if (!hasChanges) return { message: "内容已经是最新版本，无需重复发布。" };
    await run("git", ["commit", "-m", `Update video library ${new Date().toISOString().slice(0, 10)}`]);
    await run("git", ["push", "origin", "main"]);
    return { message: "已推送到 GitHub，网站通常会在 1–3 分钟内自动更新。" };
  } finally {
    publishing = false;
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${host}:${port}`);

    if (request.method === "GET" && url.pathname === "/") {
      const html = await readFile(studioPath);
      response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      response.end(html);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/library") {
      json(response, 200, JSON.parse(await readFile(libraryPath, "utf8")));
      return;
    }

    if (request.method === "GET" && !url.pathname.startsWith("/api/")) {
      const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
      const assetPath = resolve(publicRoot, relativePath);
      if (!assetPath.startsWith(`${resolve(publicRoot)}\\`)) throw new Error("无效文件路径");
      const body = await readFile(assetPath);
      const extension = extname(assetPath).toLowerCase();
      const contentTypes = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm" };
      response.writeHead(200, { "content-type": contentTypes[extension] || "application/octet-stream", "cache-control": "no-store" });
      response.end(body);
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/library") {
      const value = await readJsonBody(request);
      validateLibrary(value);
      await writeFile(libraryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
      json(response, 200, { ok: true, message: "内容草稿已保存到本地。" });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/upload") {
      const declaredLength = Number(request.headers["content-length"] || 0);
      if (declaredLength > maxUploadBytes + 1024 * 1024) throw new Error("单个文件不能超过 95MB");
      const webRequest = new Request(url, {
        method: "POST",
        headers: request.headers,
        body: Readable.toWeb(request),
        duplex: "half",
      });
      const form = await webRequest.formData();
      const file = form.get("file");
      const categorySlug = String(form.get("categorySlug") || "");
      const kind = String(form.get("kind") || "");
      if (!file || typeof file === "string" || !categorySlug.match(/^[a-z0-9-]+$/)) throw new Error("上传参数不完整");
      if (file.size > maxUploadBytes) throw new Error("单个文件不能超过 95MB");
      const extension = extname(file.name).toLowerCase();
      const allowed = kind === "video" ? [".mp4", ".webm"] : [".jpg", ".jpeg", ".png", ".webp"];
      if (!allowed.includes(extension)) throw new Error(kind === "video" ? "视频请使用 MP4 或 WebM" : "封面请使用 JPG、PNG 或 WebP");
      const directory = join(uploadRoot, categorySlug);
      await mkdir(directory, { recursive: true });
      const filename = safeName(file.name);
      await writeFile(join(directory, filename), Buffer.from(await file.arrayBuffer()));
      json(response, 200, { ok: true, path: `/commerce-videos/uploads/${categorySlug}/${filename}` });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/publish") {
      const result = await publish();
      json(response, 200, { ok: true, ...result });
      return;
    }

    json(response, 404, { error: "Not found" });
  } catch (error) {
    json(response, 400, { error: error instanceof Error ? error.message : String(error) });
  }
});

server.listen(port, host, () => {
  console.log(`\n视频内容工作台已启动： http://${host}:${port}\n关闭窗口即可停止工作台。`);
});
