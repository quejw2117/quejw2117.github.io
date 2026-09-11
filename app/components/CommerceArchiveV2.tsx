import Link from "next/link";
import type { VideoCategory } from "../content/video-library";

type CommerceArchiveProps = {
  category: VideoCategory;
  categories: VideoCategory[];
};

export default function CommerceArchiveV2({ category, categories }: CommerceArchiveProps) {
  const currentIndex = categories.findIndex((item) => item.slug === category.slug);
  const previous = categories[(currentIndex - 1 + categories.length) % categories.length];
  const next = categories[(currentIndex + 1) % categories.length];
  const archiveEnd = String(Math.max(category.videos.length, 1)).padStart(2, "0");

  return (
    <main className={`archive-page archive-page--${category.tone}`}>
      <header className="archive-header">
        <Link href="/#commerce" aria-label="返回作品集">
          QUE JIAWEI<span>/26</span>
        </Link>
        <span>AI COMMERCE FILMS</span>
        <Link href="/#commerce">全部分类 ↗</Link>
      </header>

      <section className="archive-library archive-library--direct">
        <div className="archive-library__heading">
          <span>{category.title} / VIDEO ARCHIVE / 01-{archiveEnd}</span>
          <h2>过往视频案例</h2>
          <p>
            {category.videos.length
              ? `精选${category.title}类 AI 商业视频，点击播放即可查看完整案例。`
              : "这个分类暂未添加视频，可在本地视频工作台中随时上传。"}
          </p>
        </div>
        <div className="archive-video-grid">
          {category.videos.length ? (
            category.videos.map((videoCase, index) => (
              <article className="archive-video-card archive-video-card--filled" key={videoCase.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <video
                  className="archive-video-card__media"
                  controls
                  playsInline
                  preload="metadata"
                  poster={videoCase.poster || undefined}
                  aria-label={`${videoCase.title}视频案例`}
                >
                  <source src={videoCase.src} />
                </video>
                <div className="archive-video-card__caption">
                  <strong>{videoCase.title}</strong>
                  <small>{videoCase.subtitle}</small>
                </div>
                <details className="archive-case-notes">
                  <summary>
                    案例说明 <span aria-hidden="true">＋</span>
                  </summary>
                  <div className="archive-case-notes__panel">
                    <span>CASE NOTES / 案例证据</span>
                    <h3>{videoCase.title}</h3>
                    <dl>
                      <div><dt>任务背景</dt><dd>{videoCase.task}</dd></div>
                      <div><dt>本人职责</dt><dd>{videoCase.role}</dd></div>
                      <div><dt>参考 / 创意方向</dt><dd>{videoCase.direction}</dd></div>
                      <div><dt>生成与后期方法</dt><dd>{videoCase.method}</dd></div>
                      <div><dt>关键修正</dt><dd>{videoCase.correction}</dd></div>
                      <div><dt>成片</dt><dd>{videoCase.delivery}</dd></div>
                      <div className="archive-case-notes__data"><dt>投放数据</dt><dd>{videoCase.data}</dd></div>
                    </dl>
                  </div>
                </details>
              </article>
            ))
          ) : (
            <article className="archive-video-card">
              <span>01</span><i aria-hidden="true">▶</i>
              <strong>VIDEO CASE</strong><small>待上传作品视频</small>
            </article>
          )}
        </div>
      </section>

      <nav className="archive-switcher" aria-label="视频分类快捷导航">
        <Link href={`/commerce/${previous.slug}/`} aria-label={`上一个分类：${previous.title}`}>
          <span>← PREV</span><strong>{previous.title}</strong>
        </Link>
        <details>
          <summary>
            {String(currentIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            <span>全部分类</span>
          </summary>
          <div>
            {categories.map((item, index) => (
              <Link href={`/commerce/${item.slug}/`} key={item.slug} aria-current={item.slug === category.slug ? "page" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
              </Link>
            ))}
          </div>
        </details>
        <Link href={`/commerce/${next.slug}/`} aria-label={`下一个分类：${next.title}`}>
          <span>NEXT →</span><strong>{next.title}</strong>
        </Link>
      </nav>

      <footer className="archive-footer">
        <Link href="/#commerce">← 返回作品集</Link>
        <span>© 2026 QUE JIAWEI</span>
      </footer>
    </main>
  );
}
