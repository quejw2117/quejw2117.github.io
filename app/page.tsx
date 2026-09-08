"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpecularLink from "./components/SpecularLink";
import SectionNavigation from "./components/SectionNavigation";

const projects = [
  {
    index: "01",
    type: "GENERATIVE VIDEO WORKFLOW",
    title: "即梦与多模型\n视频生产系统",
    description:
      "从参考拆解、分镜生成、人物与产品一致性测试，到失败样本修正、后期质检与交付，把多模型协作沉淀为可复用 SOP。",
    tags: ["即梦 / Dreamina", "Multi-model Test", "Consistency QC"],
    metric: "4 STEP WORKFLOW",
    className:
      "project-visual project-visual--signal project-visual--with-media",
    cover: "/workflow-tool-ui.png",
  },
  {
    index: "02",
    type: "CREATIVE RESEARCH & ITERATION",
    title: "爆款结构拆解\n与创意迭代",
    description:
      "围绕开头钩子、卖点顺序、镜头节奏与平台反馈拆解参考案例，形成可执行创意假设，并以基础数据指标辅助下一轮迭代。",
    tags: ["Hook Research", "Creative Test", "Basic Metrics"],
    metric: "RESEARCH / TEST / REVIEW",
    className:
      "project-visual project-visual--research-case project-visual--with-media",
    cover: "/creative-research-case.jpeg",
  },
];

const capabilities = [
  {
    number: "A.01",
    title: "即梦与多模型生成",
    text: "根据商品、人物与镜头控制需求组合即梦、Seedance、Gemini、GPT 等模型，完成从关键帧到动态成片的生成测试。",
    tools: "Dreamina / Seedance / Gemini / GPT",
  },
  {
    number: "A.02",
    title: "分镜与一致性控制",
    text: "把创意拆成可执行分镜，用参考约束、机位、材质与关键特征控制人物和产品在连续镜头中的一致性。",
    tools: "Storyboard / Reference / Consistency",
  },
  {
    number: "A.03",
    title: "后期剪辑与视听包装",
    text: "完成剪辑、调色、字幕、音效与节奏整理，让生成素材从单个镜头进入可交付的电商短视频成片。",
    tools: "剪映 / DaVinci / AE / Sound",
  },
  {
    number: "A.04",
    title: "爆款结构拆解",
    text: "拆解高表现内容的开头钩子、卖点顺序、镜头密度与平台节奏，把参考案例转译为新的创意方向。",
    tools: "Hook / Selling Point / Pacing",
  },
  {
    number: "A.05",
    title: "基础数据指标理解",
    text: "理解播放、完播、点击与互动等基础指标如何反映内容问题，用于提出下一轮创意假设，不代替专业投放判断。",
    tools: "Completion / Click / Interaction",
  },
  {
    number: "A.06",
    title: "SOP 沉淀与内部分享",
    text: "记录提示词、失败样本、修正方法与质检标准，整理为可复用模板、交付清单和团队内部分享材料。",
    tools: "SOP / Failure Log / QA Checklist",
  },
];

const commerceCategories = [
  {
    index: "01",
    eyebrow: "MASS MARKET / DAILY COMMERCE",
    title: "大众消费",
    description: "服饰、家居、美妆与日用商品的高频内容生产。",
    href: "/commerce/mass-market",
    images: ["/commerce-mass-01.png", "/commerce-mass-02.png"],
    tone: "commerce-card--mass",
  },
  {
    index: "02",
    eyebrow: "HIGH JEWELRY / LUXURY VISUAL",
    title: "高奢珠宝",
    description: "以材质、光泽与细节控制建立更高价值感的商业影像。",
    href: "/commerce/luxury",
    images: ["/commerce-luxury-01.png", "/commerce-luxury-02.png"],
    tone: "commerce-card--luxury",
  },
];

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const handleSpecularMove = (event: globalThis.PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        ".specular-reactive",
      );

      if (!target || !root.contains(target)) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const angle =
        Math.atan2(
          event.clientY - (rect.top + rect.height / 2),
          event.clientX - (rect.left + rect.width / 2),
        ) *
          (180 / Math.PI) +
        90;

      target.style.setProperty("--surface-x", `${x}px`);
      target.style.setProperty("--surface-y", `${y}px`);
      target.style.setProperty("--surface-angle", `${angle}deg`);
    };

    root.addEventListener("pointermove", handleSpecularMove);

    const context = gsap.context(() => {
      gsap.set(".site-header, .promo-bar", { y: -34, autoAlpha: 0 });
      gsap.set(".hero-title-line > span", {
        yPercent: 105,
        transformOrigin: "50% 100%",
      });
      gsap.set(".hero-kicker, .hero-center > p, .hero-actions", {
        y: 34,
        autoAlpha: 0,
      });
      gsap.set(".hero-video", { scale: 1.06 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(
          ".promo-bar, .site-header",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.07,
          },
          0,
        )
        .to(
          ".hero-title-line > span",
          {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.09,
            ease: "power4.out",
          },
          0.12,
        )
        .to(
          ".hero-kicker, .hero-center > p, .hero-actions",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.08,
          },
          0.48,
        )
        .to(
          ".hero-video",
          { scale: 1, duration: 1.8, ease: "power2.out" },
          0,
        );

      gsap.utils.toArray<HTMLElement>(".section-display").forEach((display) => {
        gsap.fromTo(
          display.querySelector("span"),
          {
            xPercent: -18,
            scaleX: 0.7,
            clipPath: "inset(0 100% 0 0)",
            transformOrigin: "0% 50%",
          },
          {
            xPercent: 0,
            scaleX: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.55,
            ease: "power4.out",
            scrollTrigger: {
              trigger: display,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".section-heading")
        .forEach((heading) => {
          gsap.fromTo(
            Array.from(heading.children),
            { y: 92, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

      gsap.fromTo(
        ".about-copy > .lead, .about-copy > p:not(.lead), .experience-list article, .contact-line",
        { y: 80, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".stats-grid > div",
        {
          y: 110,
          scaleY: 0.82,
          autoAlpha: 0,
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          scaleY: 1,
          autoAlpha: 1,
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        const visual = card.querySelector<HTMLElement>(".project-visual");
        const info = card.querySelector<HTMLElement>(".project-info");
        const visualCore = card.querySelector<HTMLElement>(".visual-core");

        if (visual) {
          gsap.fromTo(
            visual,
            {
              y: 130,
              scale: 0.92,
              clipPath: "inset(14% 0 14% 0)",
              transformOrigin: "50% 50%",
            },
            {
              y: 0,
              scale: 1,
              clipPath: "inset(0% 0 0% 0)",
              duration: 1.55,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            },
          );
        }

        if (info) {
          gsap.fromTo(
            Array.from(info.children),
            { x: index % 2 === 0 ? 70 : -70, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1.05,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (visualCore && window.innerWidth > 760) {
          gsap.fromTo(
            visualCore,
            { yPercent: -7, scale: 1.05 },
            {
              yPercent: 7,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            },
          );
        }
      });

      gsap.fromTo(
        ".commerce-card",
        {
          y: 130,
          scale: 0.93,
          clipPath: "inset(12% 0 12% 0)",
          autoAlpha: 0,
        },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0 0% 0)",
          autoAlpha: 1,
          duration: 1.5,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".commerce-grid",
            start: "top 82%",
            once: true,
          },
        },
      );

      if (window.innerWidth > 760) {
        gsap.utils
          .toArray<HTMLElement>(".commerce-card__image")
          .forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -4, scale: 1.06 },
              {
                yPercent: 4,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: image,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              },
            );
          });
      }

      gsap.fromTo(
        ".capability-grid article",
        {
          y: 120,
          scaleY: 0.84,
          clipPath: "inset(12% 0 0 0)",
          autoAlpha: 0,
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          scaleY: 1,
          clipPath: "inset(0% 0 0 0)",
          autoAlpha: 1,
          duration: 1.25,
          stagger: 0.13,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".capability-grid",
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-center > p",
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-center",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-link-mask > span",
        {
          yPercent: 120,
          scaleX: 0.72,
          scaleY: 0.68,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 1.55,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-center",
            start: "top 72%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-item, .qr-placeholder",
        {
          y: 76,
          autoAlpha: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-directory",
            start: "top 84%",
            once: true,
          },
        },
      );
    }, root);

    return () => {
      root.removeEventListener("pointermove", handleSpecularMove);
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="portfolio-home">
      <SectionNavigation />
      <div className="promo-bar">
        <span>PORTFOLIO 2026 · AI VIDEO DESIGN × VISUAL SYSTEMS</span>
        <span>SHENZHEN, CHINA</span>
      </div>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Back to home">
          QUE JIAWEI<span>/26</span>
        </a>
        <nav aria-label="主导航">
          <a href="#commerce">AI 带货视频</a>
          <a href="#work">工作流搭建</a>
          <a href="#ability">专业能力</a>
          <a href="#about">关于我</a>
        </nav>
        <div className="header-actions">
          <a className="header-mail" href="mailto:1427954145@qq.com">
            邮箱联系
          </a>
          <SpecularLink className="contact-pill" href="#contact" radius={2}>
            联系我 <span aria-hidden="true">↗</span>
          </SpecularLink>
        </div>
        <details className="mobile-menu">
          <summary>菜单</summary>
          <nav aria-label="移动端主导航">
            <a href="#commerce">AI 带货视频</a>
            <a href="#work">工作流搭建</a>
            <a href="#ability">专业能力</a>
            <a href="#about">关于我</a>
            <a href="#contact">联系我</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top" tabIndex={-1}>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          aria-hidden="true"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-content page-shell">
          <div className="hero-center">
            <div className="hero-kicker">
              AI VIDEO DESIGN · ECOMMERCE CREATIVE
            </div>
            <h1>
              <span className="hero-title-line">
                <span>Ideas become</span>
              </span>
              <span className="hero-title-line hero-title-line--serif">
                <span>visual systems.</span>
              </span>
            </h1>
            <p>
              AI 视频设计师 / 视觉设计师
              <br />
              用生成式影像与可复用工作流，让电商创意高效落地。
            </p>
            <div className="hero-actions">
              <SpecularLink className="hero-cta" href="#commerce" radius={2}>
                VIEW AI COMMERCE FILMS <span aria-hidden="true">↘</span>
              </SpecularLink>
              <a className="hero-secondary-link" href="#work">
                OTHER SELECTED WORK <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className="about section-space" id="about" tabIndex={-1}>
        <div className="page-shell">
          <div className="section-display section-display--dark" aria-hidden="true">
            <span>PROFILE</span>
          </div>
          <div className="section-heading">
            <span>01 / PROFILE</span>
            <h2>
              不止设计画面，
              <br />
              更设计<span className="accent-text">解决问题的路径。</span>
            </h2>
          </div>

          <div className="about-grid">
            <figure className="profile-portrait">
              <div className="profile-portrait-frame">
                <img
                  src="/avatar-cartoon.png"
                  alt="阙嘉炜的卡通形象"
                  width="1254"
                  height="1254"
                />
              </div>
              <figcaption>
                <span>QUE JIAWEI</span>
                <span>AI VIDEO / VISUAL DESIGNER</span>
              </figcaption>
            </figure>
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
                  <time>2026.06 - NOW</time>
                  <div>
                    <h3>AIGC 视频制作师</h3>
                    <p>跨境电商商业短视频 / 策划 / 分镜 / 生成 / 品控</p>
                  </div>
                </article>
                <article>
                  <time>2025.11 - 2026.04</time>
                  <div>
                    <h3>新媒体运营</h3>
                    <p>国创文化（深圳）科技有限公司</p>
                  </div>
                </article>
                <article>
                  <time>2024.07 - 2025.10</time>
                  <div>
                    <h3>自主创业 / 淘宝服装零售</h3>
                    <p>淘宝店铺运营 / 服装销售 / 视觉呈现 / 社交媒体宣传与发布</p>
                  </div>
                </article>
                <article>
                  <time>2023.06 - 2025.08</time>
                  <div>
                    <h3>美术老师 / 内容推广</h3>
                    <p>凯琪艺术培训有限公司</p>
                  </div>
                </article>
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

      <section className="commerce section-space" id="commerce" tabIndex={-1}>
        <div className="page-shell">
          <div
            className="section-display section-display--commerce"
            aria-hidden="true"
          >
            <span>AI COMMERCE</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>02 / AI COMMERCE FILMS</span>
              <h2>AI 带货视频</h2>
            </div>
            <p>
              从大众消费到高奢珠宝，四条 9:16 成片以内快速呈现我的生成、修正与后期能力。
              <br />
              点击分类查看任务背景、本人职责、制作方法与关键修正，三次点击内到达完整案例。
            </p>
          </div>

          <div className="commerce-grid">
            {commerceCategories.map((category) => (
              <a
                className={`commerce-card ${category.tone} specular-reactive`}
                href={category.href}
                key={category.index}
              >
                <div className="commerce-card__media">
                  {category.images.map((image, index) => (
                    <img
                      className="commerce-card__image"
                      src={image}
                      alt=""
                      key={image}
                      aria-hidden="true"
                      data-layer={index + 1}
                    />
                  ))}
                  <span className="commerce-card__index">{category.index}</span>
                  <span className="commerce-card__open">VIEW ARCHIVE ↗</span>
                </div>
                <div className="commerce-card__copy">
                  <span>{category.eyebrow}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
                <span className="specular-reactive__fx" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="work section-space" id="work" tabIndex={-1}>
        <div className="page-shell">
          <div className="section-display" aria-hidden="true">
            <span>AI WORKFLOW</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>03 / WORKFLOW SYSTEM</span>
              <h2>工作流搭建</h2>
            </div>
            <p>
              从即梦与多模型测试，到分镜生成、人物与产品一致性控制，再到失败修正和 AI 素材质检。
              <br />
              最终沉淀为可复用 SOP、交付清单与内部分享，保留完整的 4 STEP WORKFLOW 设计语言。
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article
                className={`project-card project-card--${project.index}`}
                id={project.index === "02" ? "creative-research" : undefined}
                tabIndex={project.index === "02" ? -1 : undefined}
                key={project.index}
              >
                <div className={`${project.className} specular-reactive`}>
                  <span className="project-index">{project.index}</span>
                  <div className="visual-core" aria-hidden="true">
                    {"cover" in project ? (
                      <div className="project-media">
                        <img
                          className="project-cover"
                          src={project.cover}
                          alt=""
                        />
                      </div>
                    ) : (
                      <>
                        <span />
                        <span />
                        <span />
                      </>
                    )}
                  </div>
                  <span className="project-metric">{project.metric}</span>
                  <span className="specular-reactive__fx" aria-hidden="true" />
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

      <section className="abilities section-space" id="ability" tabIndex={-1}>
        <div className="page-shell">
          <div className="section-display" aria-hidden="true">
            <span>CAPABILITIES</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>05 / CAPABILITIES</span>
              <h2>
                从生成到交付，
                <br />
                形成完整闭环。
              </h2>
            </div>
            <p>
              生成、分镜、一致性、后期、研究与 SOP，
              <br />
              每项能力都指向更稳定、更可复用的电商视频交付。
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article
                className="specular-reactive specular-reactive--quiet"
                key={capability.number}
              >
                <span className="cap-number">{capability.number}</span>
                <div className="cap-symbol" aria-hidden="true">
                  {capability.number.slice(-1)}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
                <span className="cap-tools">{capability.tools}</span>
                <span className="specular-reactive__fx" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-section" id="contact" tabIndex={-1}>
        <div className="contact-noise" aria-hidden="true" />
        <div className="page-shell contact-inner">
          <div className="section-display section-display--contact" aria-hidden="true">
            <span>CONTACT</span>
          </div>
          <div className="contact-top">
            <span>06 / CONTACT</span>
            <span>LET&apos;S CREATE SOMETHING MEANINGFUL.</span>
          </div>
          <div className="contact-center">
            <p>有一个值得被看见的想法？</p>
            <a className="contact-link-mask" href="mailto:1427954145@qq.com">
              <span>
                联系我
                <i aria-hidden="true">↗</i>
              </span>
            </a>
          </div>
          <div className="contact-directory">
            <div className="contact-list" aria-label="联系方式">
              <a
                className="contact-item specular-surface"
                href="https://github.com/quejw2117"
                target="_blank"
                rel="noreferrer"
              >
                <span>GITHUB</span>
                <strong>github.com/quejw2117</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <div className="contact-item">
                <span>WECHAT</span>
                <strong>Mr_QUEJW</strong>
              </div>
              <a
                className="contact-item specular-surface"
                href="mailto:1427954145@qq.com"
              >
                <span>QQ / EMAIL</span>
                <strong>1427954145@qq.com</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                className="contact-item specular-surface"
                href="mailto:quejw2117@gmail.com"
              >
                <span>GOOGLE MAIL</span>
                <strong>quejw2117@gmail.com</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                className="contact-item specular-surface"
                href="tel:18250030358"
              >
                <span>PHONE</span>
                <strong>182 5003 0358</strong>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
            <div
              className="qr-placeholder qr-placeholder--filled"
              aria-label="阙嘉炜的微信二维码"
            >
              <img
                className="qr-image"
                src="/wechat-qr.jpg"
                alt="阙嘉炜的微信二维码，扫码添加好友"
              />
              <span className="qr-corner qr-corner--tl" />
              <span className="qr-corner qr-corner--tr" />
              <span className="qr-corner qr-corner--bl" />
              <span className="qr-corner qr-corner--br" />
            </div>
          </div>
          <div className="contact-bottom">
            <div>
              <a href="mailto:1427954145@qq.com">QQ MAIL</a>
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
