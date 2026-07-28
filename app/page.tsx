const projects = [
  {
    index: "01",
    type: "AIGC VIDEO SYSTEM",
    title: "跨境电商 AIGC\n内容生产系统",
    description:
      "为家居、节日礼品、园艺等 8 大品类搭建从分镜脚本、视觉锚点到批量成片的标准化工作流。",
    tags: ["Creative Direction", "Prompt System", "Video"],
    metric: "交付周期 -75%",
    className: "project-visual project-visual--signal",
  },
  {
    index: "02",
    type: "SOCIAL GROWTH",
    title: "多平台内容增长\n与品牌获客",
    description:
      "统筹小红书、抖音、快手与视频号内容，以视觉设计、拍摄剪辑和数据复盘驱动稳定咨询。",
    tags: ["Content Strategy", "Campaign", "Growth"],
    metric: "累计获客 100+",
    className: "project-visual project-visual--orbit",
  },
  {
    index: "03",
    type: "VISUAL EDUCATION",
    title: "「手绘技巧」\n视觉内容系列",
    description:
      "从内容栏目、课程视觉到 PS / Procreate 素材，建立统一且具有辨识度的美术教育内容系统。",
    tags: ["Art Direction", "Editorial", "Illustration"],
    metric: "单篇阅读 5,000+",
    className: "project-visual project-visual--editorial",
  },
];

const capabilities = [
  {
    number: "A.01",
    title: "视觉与品牌表达",
    text: "以品牌目标为起点，建立字体、色彩、版式与影像语言，让视觉不只“好看”，更能被识别与记住。",
    tools: "PS · Procreate · PPT",
  },
  {
    number: "A.02",
    title: "AIGC 影像制作",
    text: "熟练使用 Seedance、GPT、Gemini 等工具，把参考图约束、提示词和品控标准转化为稳定成片。",
    tools: "Seedance · GPT · Gemini",
  },
  {
    number: "A.03",
    title: "视频与动态叙事",
    text: "从策划、分镜、拍摄到剪辑，兼顾节奏、视觉锚点和平台语境，完成端到端内容创作。",
    tools: "DaVinci · AE · 剪映",
  },
  {
    number: "A.04",
    title: "内容增长系统",
    text: "理解小红书、抖音、快手与视频号的内容机制，用数据复盘持续校准创意与转化路径。",
    tools: "Strategy · Data · Growth",
  },
];

export default function Home() {
  return (
    <main>
      <div className="promo-bar">
        <span>PORTFOLIO 2026 · VISUAL DESIGN × AI CREATIVE</span>
        <span>SHENZHEN, CHINA</span>
      </div>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="返回首页">
          阙嘉炜<span>/26</span>
        </a>
        <nav aria-label="主导航">
          <a href="#work">精选项目</a>
          <a href="#about">关于我</a>
          <a href="#ability">专业能力</a>
        </nav>
        <div className="header-actions">
          <a className="header-mail" href="mailto:1427954145@qq.com">
            邮箱联系
          </a>
          <a className="contact-pill" href="#contact">
            联系我 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster=""
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/29765099/12791129_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-fallback" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-content page-shell">
          <div className="hero-center">
            <div className="hero-kicker">
              <span className="status-dot" />
              AVAILABLE FOR SELECTED PROJECTS
            </div>
            <h1>
              Ideas become
              <br />
              <span>visual systems.</span>
            </h1>
            <p>
              视觉设计师 / AI 设计师 / 品牌设计师
              <br />
              用影像与智能工作流，让创意真正落地。
            </p>
            <a className="hero-cta" href="#work">
              VIEW SELECTED WORK <span aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="hero-showcase" aria-label="精选作品预览">
            <a className="hero-work-card hero-work-card--left" href="#work">
              <span className="hero-work-top">
                <b>02</b>
                <em>SOCIAL GROWTH</em>
              </span>
              <span className="hero-work-art hero-work-art--left" aria-hidden="true">
                <i>100+</i>
                <i>LEADS</i>
              </span>
            </a>
            <a className="hero-work-card hero-work-card--main" href="#work">
              <span className="hero-work-top">
                <b>01</b>
                <em>AIGC VIDEO SYSTEM</em>
              </span>
              <span className="hero-work-art hero-work-art--main" aria-hidden="true">
                <i>VISUAL</i>
                <i>WORKFLOW</i>
                <small>STRATEGY · PROMPT · MOTION</small>
              </span>
            </a>
            <a className="hero-work-card hero-work-card--right" href="#work">
              <span className="hero-work-top">
                <b>03</b>
                <em>BRAND VISUAL</em>
              </span>
              <span className="hero-work-art hero-work-art--right" aria-hidden="true">
                <i>96%</i>
                <i>ACCURACY</i>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="about section-space" id="about">
        <div className="page-shell">
          <div className="section-heading">
            <span>01 / PROFILE</span>
            <h2>
              不止设计画面，
              <br />
              更设计<span className="accent-text">解决问题的路径。</span>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">
                我拥有数字媒体艺术背景，工作横跨视觉创作、新媒体增长与
                AIGC 商业影像。相比单点执行，我更擅长把创意整理成可以稳定复用的系统。
              </p>
              <p>
                从品牌海报、内容栏目到跨境电商短视频，我关注每个视觉决策与最终业务结果之间的联系。
                目前持续探索 AI 在创意生产、角色一致性和批量内容交付中的真实价值。
              </p>

              <div className="experience-list">
                <article>
                  <time>2026.06 — NOW</time>
                  <div>
                    <h3>AIGC 视频制作师</h3>
                    <p>跨境电商商业短视频 · 策划 / 分镜 / 生成 / 品控</p>
                  </div>
                </article>
                <article>
                  <time>2025.11 — 2026.04</time>
                  <div>
                    <h3>新媒体运营</h3>
                    <p>国创文化（深圳）科技有限公司</p>
                  </div>
                </article>
                <article>
                  <time>2023.06 — 2025.08</time>
                  <div>
                    <h3>美术老师 / 内容推广</h3>
                    <p>凯琪艺术培训有限公司</p>
                  </div>
                </article>
              </div>

              <div className="contact-line">
                <a href="mailto:1427954145@qq.com">1427954145@qq.com ↗</a>
                <a href="tel:18250030358">182 5003 0358 ↗</a>
              </div>
            </div>
          </div>

          <div className="stats-grid" aria-label="项目成果数据">
            <div>
              <strong>200<sup>+</sup></strong>
              <span>标准化分镜脚本</span>
            </div>
            <div>
              <strong>150<sup>+</sup></strong>
              <span>月均商业视频</span>
            </div>
            <div>
              <strong>96<sup>%</sup></strong>
              <span>商品造型还原</span>
            </div>
            <div>
              <strong>80<sup>%+</sup></strong>
              <span>生产效率提升</span>
            </div>
          </div>
        </div>
      </section>

      <section className="work section-space" id="work">
        <div className="page-shell">
          <div className="section-heading section-heading--split">
            <div>
              <span>02 / SELECTED WORK</span>
              <h2>精选项目</h2>
            </div>
            <p>
              这些项目展示了我如何连接视觉、内容与工作流。
              <br />
              当前为基础版项目封面，后续可替换为你的真实案例素材。
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className="project-card" key={project.index}>
                <div className={project.className}>
                  <span className="project-index">{project.index}</span>
                  <div className="visual-core" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="project-metric">{project.metric}</span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-type">{project.type}</span>
                    <h3>
                      {project.title.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h3>
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="abilities section-space" id="ability">
        <div className="page-shell">
          <div className="section-heading section-heading--split">
            <div>
              <span>03 / CAPABILITIES</span>
              <h2>
                一个人，
                <br />
                连接多种能力。
              </h2>
            </div>
            <p>
              从第一帧的审美判断，到最后一步的交付效率，
              <br />
              我希望每种能力都服务于同一个清晰目标。
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.number}>
                <span className="cap-number">{capability.number}</span>
                <div className="cap-symbol" aria-hidden="true">
                  {capability.number.slice(-1)}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <span className="cap-tools">{capability.tools}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-noise" aria-hidden="true" />
        <div className="page-shell contact-inner">
          <div className="contact-top">
            <span>04 / CONTACT</span>
            <span>LET&apos;S CREATE SOMETHING MEANINGFUL.</span>
          </div>
          <div className="contact-center">
            <p>有一个值得被看见的想法？</p>
            <a href="mailto:1427954145@qq.com">
              LET&apos;S TALK
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-bottom">
            <div>
              <a href="mailto:1427954145@qq.com">EMAIL</a>
              <a href="tel:18250030358">PHONE</a>
            </div>
            <p>© 2026 QUE JIAWEI. DESIGNED WITH INTENTION.</p>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
