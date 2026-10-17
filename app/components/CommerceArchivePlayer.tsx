"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { VideoCase, VideoCategory } from "../content/video-library";

type Props = { category: VideoCategory; categories: VideoCategory[] };
type VideoMeta = { ratio: number; duration: number };

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function getNotes(video: VideoCase) {
  return [
    ["作品背景", video.task],
    ["本人职责", video.role],
    ["创作方向", video.direction],
    ["生成与后期", video.method],
    ["关键修正", video.correction],
    ["成片规格", video.delivery],
    ["投放数据", video.data],
  ].filter(([, value]) => value?.trim() && value !== "暂未获得投放数据");
}

export default function CommerceArchivePlayer({ category, categories }: Props) {
  const players = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Record<string, VideoMeta>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function fullscreen(id: string) {
    const player = players.current[id] as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!player) return;
    try {
      if (player.requestFullscreen) await player.requestFullscreen();
      else if (player.webkitEnterFullscreen) player.webkitEnterFullscreen();
      await player.play();
    } catch {
      player.focus();
    }
  }

  return (
    <main className="archive-page archive-page--hr">
      <header className="archive-header">
        <Link href="/#top" aria-label="返回首页">QUE JIAWEI<span>/26</span></Link>
        <span>AIGC VIDEO PORTFOLIO</span>
        <Link href="/#commerce">全部作品 ↗</Link>
      </header>

      <div className="film-library">
        <nav className="film-tabs" aria-label="视频作品分类">
          {categories.map(item => (
            <Link key={item.slug} href={`/commerce/${item.slug}/`} aria-current={item.slug === category.slug ? "page" : undefined}>
              {item.title}<span>{item.videos.length}</span>
            </Link>
          ))}
        </nav>

        <div className="film-heading">
          <h1>{category.title}</h1>
          <p>{category.subtitle}。<span>{category.videos.length} 支完整作品</span></p>
        </div>

        <div className="film-grid">
          {category.videos.map((video, index) => {
            const meta = metadata[video.id];
            const notes = getNotes(video);
            return (
              <article className="film-card" key={video.id} data-playing={playingId === video.id}>
                <div className="film-player" style={{ aspectRatio: meta?.ratio || (video.delivery.includes("3:4") ? 3 / 4 : 9 / 16) }}>
                  <video
                    ref={element => { players.current[video.id] = element; }}
                    controls
                    playsInline
                    preload="metadata"
                    poster={video.poster || undefined}
                    aria-label={`${video.title}视频案例`}
                    onLoadedMetadata={event => {
                      const player = event.currentTarget;
                      if (player.videoWidth && player.videoHeight) {
                        setMetadata(current => ({ ...current, [video.id]: { ratio: player.videoWidth / player.videoHeight, duration: player.duration } }));
                      }
                    }}
                    onPlay={event => {
                      const current = event.currentTarget;
                      Object.values(players.current).forEach(player => {
                        if (player && player !== current) player.pause();
                      });
                      setPlayingId(video.id);
                    }}
                    onPause={() => setPlayingId(current => current === video.id ? null : current)}
                    onEnded={() => setPlayingId(current => current === video.id ? null : current)}
                    onError={() => setErrors(current => ({ ...current, [video.id]: true }))}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  {errors[video.id] && (
                    <div className="film-error" role="alert">
                      <p>视频暂时没有加载成功。</p>
                      <button type="button" onClick={() => {
                        setErrors(current => ({ ...current, [video.id]: false }));
                        players.current[video.id]?.load();
                      }}>重新加载</button>
                      <a href={video.src} target="_blank" rel="noreferrer">单独打开视频 ↗</a>
                    </div>
                  )}
                </div>

                <div className="film-caption">
                  <div className="film-caption__meta">
                    <span>{String(index + 1).padStart(2, "0")} / {String(category.videos.length).padStart(2, "0")}</span>
                    {meta && Number.isFinite(meta.duration) && <span>{formatDuration(meta.duration)}</span>}
                    <button className="film-fullscreen" type="button" onClick={() => fullscreen(video.id)} aria-label={`全屏观看${video.title}`}>
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4" /></svg>
                      全屏观看
                    </button>
                  </div>
                  <h2>{video.title}</h2>
                  <p>{video.subtitle}</p>
                </div>

                {notes.length > 0 && (
                  <details className="film-notes">
                    <summary>制作说明<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 10h12M10 4v12" /></svg></summary>
                    <dl>{notes.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                  </details>
                )}
              </article>
            );
          })}
        </div>

        {!category.videos.length && <p className="film-empty">这个方向的作品正在整理中。</p>}
      </div>

      <footer className="archive-footer film-footer">
        <Link href="/#top">返回首页 ↗</Link>
        <Link href="/#commerce">浏览全部作品</Link>
        <span>© 2026 QUE JIAWEI</span>
      </footer>
    </main>
  );
}
