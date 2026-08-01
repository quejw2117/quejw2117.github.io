type CommerceArchiveProps = {
  category: string;
  eyebrow: string;
  description: string;
  images: [string, string];
  alternateHref: string;
  alternateLabel: string;
  tone: "mass" | "luxury";
};

export default function CommerceArchive({
  category,
  eyebrow,
  description,
  images,
  alternateHref,
  alternateLabel,
  tone,
}: CommerceArchiveProps) {
  return (
    <main className={`archive-page archive-page--${tone}`}>
      <header className="archive-header">
        <a href="/#commerce" aria-label="返回作品集">
          QUE JIAWEI<span>/26</span>
        </a>
        <span>AI COMMERCE FILMS</span>
        <a href={alternateHref}>{alternateLabel} ↗</a>
      </header>

      <section className="archive-hero">
        <div className="archive-hero__copy">
          <span>{eyebrow}</span>
          <h1>{category}</h1>
          <p>{description}</p>
        </div>
        <div className="archive-hero__media">
          <img src={images[0]} alt={`${category}案例视觉一`} />
          <img src={images[1]} alt={`${category}案例视觉二`} />
        </div>
      </section>

      <section className="archive-library">
        <div className="archive-library__heading">
          <span>VIDEO ARCHIVE / 01—04</span>
          <h2>过往视频案例</h2>
          <p>视频入口已经预留。后续可接入本地视频文件或小红书等外部作品链接。</p>
        </div>
        <div className="archive-video-grid">
          {Array.from({ length: 4 }, (_, index) => (
            <article className="archive-video-card" key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true">▶</i>
              <strong>VIDEO CASE</strong>
              <small>待接入作品视频</small>
            </article>
          ))}
        </div>
      </section>

      <footer className="archive-footer">
        <a href="/#commerce">← 返回作品集</a>
        <span>© 2026 QUE JIAWEI</span>
      </footer>
    </main>
  );
}
