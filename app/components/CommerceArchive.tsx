import Link from "next/link";

type CommerceArchiveProps = {
  category: string;
  eyebrow: string;
  description: string;
  images: [string, string];
  alternateHref: string;
  alternateLabel: string;
  tone: "mass" | "luxury";
  cases?: Array<{
    title: string;
    src: string;
    poster: string;
    task: string;
    role: string;
    direction: string;
    method: string;
    correction: string;
    delivery: string;
    data: string;
  }>;
};

export default function CommerceArchive({
  category,
  eyebrow,
  description,
  images,
  alternateHref,
  alternateLabel,
  tone,
  cases,
}: CommerceArchiveProps) {
  return (
    <main className={`archive-page archive-page--${tone}`}>
      <header className="archive-header">
        <Link href="/#commerce" aria-label="返回作品集">
          QUE JIAWEI<span>/26</span>
        </Link>
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
          <span>VIDEO ARCHIVE / 01-04</span>
          <h2>过往视频案例</h2>
          <p>
            {cases?.length
              ? `精选${tone === "luxury" ? "高奢珠宝" : "大众消费"}类 AI 商业视频，点击播放即可查看完整案例。`
              : "视频入口已经预留。后续可接入本地视频文件或小红书等外部作品链接。"}
          </p>
        </div>
        <div className="archive-video-grid">
          {Array.from({ length: 4 }, (_, index) => {
            const videoCase = cases?.[index];

            return (
              <article
                className={`archive-video-card${videoCase ? " archive-video-card--filled" : ""}`}
                key={videoCase?.src ?? index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {videoCase ? (
                  <>
                    <video
                      className="archive-video-card__media"
                      controls
                      playsInline
                      preload="metadata"
                      poster={videoCase.poster}
                      aria-label={`${videoCase.title}视频案例`}
                    >
                      <source src={videoCase.src} type="video/mp4" />
                    </video>
                    <div className="archive-video-card__caption">
                      <strong>{videoCase.title}</strong>
                      <small>AI COMMERCIAL FILM</small>
                    </div>
                    <details className="archive-case-notes">
                      <summary>
                        案例说明 <span aria-hidden="true">＋</span>
                      </summary>
                      <div className="archive-case-notes__panel">
                        <span>CASE NOTES / 案例证据</span>
                        <h3>{videoCase.title}</h3>
                        <dl>
                          <div>
                            <dt>任务背景</dt>
                            <dd>{videoCase.task}</dd>
                          </div>
                          <div>
                            <dt>本人职责</dt>
                            <dd>{videoCase.role}</dd>
                          </div>
                          <div>
                            <dt>参考 / 创意方向</dt>
                            <dd>{videoCase.direction}</dd>
                          </div>
                          <div>
                            <dt>生成与后期方法</dt>
                            <dd>{videoCase.method}</dd>
                          </div>
                          <div>
                            <dt>关键修正</dt>
                            <dd>{videoCase.correction}</dd>
                          </div>
                          <div>
                            <dt>成片</dt>
                            <dd>{videoCase.delivery}</dd>
                          </div>
                          <div className="archive-case-notes__data">
                            <dt>投放数据</dt>
                            <dd>{videoCase.data}</dd>
                          </div>
                        </dl>
                      </div>
                    </details>
                  </>
                ) : (
                  <>
                    <i aria-hidden="true">▶</i>
                    <strong>VIDEO CASE</strong>
                    <small>待接入作品视频</small>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer className="archive-footer">
        <Link href="/#commerce">← 返回作品集</Link>
        <span>© 2026 QUE JIAWEI</span>
      </footer>
    </main>
  );
}
