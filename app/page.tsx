"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const journalClips = [
  {
    index: "01",
    type: "CITY VLOG",
    title: "城市漫游",
    meta: "日常观察 / 街头影像",
    className: "journal-poster journal-poster--city",
  },
  {
    index: "02",
    type: "AIGC VIDEO",
    title: "AIGC 视频制作",
    meta: "个人制作 / AI 生成影像",
    className:
      "journal-poster journal-poster--aigc journal-poster--has-cover",
    cover: "/aigc-video-cover.jpg",
  },
  {
    index: "03",
    type: "ON THE ROAD",
    title: "旅途与现场",
    meta: "旅行 VLOG / 沿途片段",
    className: "journal-poster journal-poster--road",
  },
  {
    index: "04",
    type: "PERSONAL ARCHIVE",
    title: "更多生活记录",
    meta: "持续更新中",
    className: "journal-poster journal-poster--archive",
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
      gsap.set(".opening-sequence", { display: "none" });
      return;
    }

    document.body.classList.add("is-opening");

    const context = gsap.context(() => {
      const openingCount = root.querySelector<HTMLElement>(".opening-count");
      const counter = { value: 0 };
      const openingTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      gsap.set(".site-header, .promo-bar", { y: -34, autoAlpha: 0 });
      gsap.set(".hero-title-line > span", {
        yPercent: 118,
        scaleX: 0.78,
        scaleY: 0.66,
        transformOrigin: "50% 100%",
      });
      gsap.set(".hero-kicker, .hero-center > p, .hero-cta, .hero-rail", {
        y: 34,
        autoAlpha: 0,
      });
      gsap.set(".hero-video", { scale: 1.14 });

      openingTimeline
        .fromTo(
          ".opening-index, .opening-name",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.35,
            ease: "power2.inOut",
            onUpdate: () => {
              if (openingCount) {
                openingCount.textContent = `${Math.round(counter.value)
                  .toString()
                  .padStart(2, "0")} / 100`;
              }
            },
          },
          0.12,
        )
        .to(
          ".opening-copy",
          {
            y: -28,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power3.in",
          },
          "+=0.08",
        )
        .to(
          ".opening-panel",
          {
            scaleY: 0,
            transformOrigin: "50% 0%",
            duration: 1.3,
            stagger: { each: 0.075, from: "end" },
            ease: "expo.inOut",
          },
          "-=0.14",
        )
        .to(
          ".opening-sequence",
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 0.2,
            onComplete: () => {
              document.body.classList.remove("is-opening");
              gsap.set(".opening-sequence", { display: "none" });
            },
          },
          "-=0.18",
        )
        .to(
          ".promo-bar, .site-header",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.65",
        )
        .to(
          ".hero-title-line > span",
          {
            yPercent: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 1.45,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.76",
        )
        .to(
          ".hero-kicker, .hero-center > p, .hero-cta, .hero-rail",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=1",
        )
        .to(
          ".hero-video",
          { scale: 1, duration: 2.2, ease: "power3.out" },
          "-=0.85",
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
        ".journal-card",
        {
          y: 120,
          scale: 0.94,
          clipPath: "inset(12% 0 12% 0)",
          autoAlpha: 0,
        },
        {
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0 0% 0)",
          autoAlpha: 1,
          duration: 1.45,
          stagger: 0.13,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 82%",
            once: true,
          },
        },
      );

      if (window.innerWidth > 760) {
        gsap.utils
          .toArray<HTMLElement>(".journal-poster-inner")
          .forEach((poster) => {
            gsap.fromTo(
              poster,
              { yPercent: -5, scale: 1.08 },
              {
                yPercent: 5,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: poster,
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
      document.body.classList.remove("is-opening");
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef}>
      <div className="opening-sequence" aria-hidden="true">
        <div className="opening-panels">
          {Array.from({ length: 5 }, (_, index) => (
            <span className="opening-panel" key={index} />
          ))}
        </div>
        <div className="opening-copy">
          <span className="opening-index">PORTFOLIO / 2026</span>
          <strong className="opening-name">QUE JIAWEI</strong>
          <span className="opening-count">00 / 100</span>
        </div>
      </div>

      <div className="promo-bar">
        <span>PORTFOLIO 2026 · VISUAL DESIGN × AI CREATIVE</span>
        <span>SHENZHEN, CHINA</span>
      </div>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Back to home">
          QUE JIAWEI<span>/26</span>
        </a>
        <nav aria-label="主导航">
          <a href="#work">工作流搭建</a>
          <a href="#journal">兴趣影像</a>
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
              <span className="status-dot" />
              AVAILABLE FOR SELECTED PROJECTS
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
              视觉设计师 / AI 设计师 / 品牌设计师
              <br />
              用影像与智能工作流，让创意真正落地。
            </p>
            <a className="hero-cta" href="#work">
              VIEW SELECTED WORK <span aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="hero-rail" aria-label="首屏浏览提示">
            <span>VISUAL DESIGN · AIGC · BRAND SYSTEMS</span>
            <div className="hero-rail-progress" aria-hidden="true">
              <i>
                <b />
              </i>
              <span>01 / 05</span>
            </div>
            <a href="#about">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="about section-space" id="about">
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
                <span>VISUAL / AI DESIGNER</span>
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
                  <time>2024.07 — 2025.10</time>
                  <div>
                    <h3>自主创业 / 淘宝服装零售</h3>
                    <p>淘宝店铺运营 · 服装销售 / 视觉呈现 / 社交媒体宣传与发布</p>
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
          <div className="section-display" aria-hidden="true">
            <span>SELECTED WORK</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>02 / SELECTED WORK</span>
              <h2>工作流搭建</h2>
            </div>
            <p>
              这些项目展示了我如何把视觉、内容与 AIGC 整理为可复用的生产系统。
              <br />
              当前为基础版项目封面，后续可替换为真实案例素材。
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

      <section className="journal section-space" id="journal">
        <div className="page-shell">
          <div
            className="section-display section-display--journal"
            aria-hidden="true"
          >
            <span>INTEREST IN MOTION</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>03 / INTEREST ARCHIVE</span>
              <h2>兴趣影像</h2>
            </div>
            <p>
              收藏镜头之外的兴趣：VLOG、旅途、生活片段与个人制作的 AIGC
              影像实验。
              <br />
              视频位置已预留，后续可直接替换为你的真实作品。
            </p>
          </div>

          <div className="journal-grid">
            {journalClips.map((clip) => (
              <article className="journal-card" key={clip.index}>
                <div className={clip.className}>
                  {"cover" in clip ? (
                    <img
                      className="journal-poster-inner journal-cover"
                      src={clip.cover}
                      alt={`${clip.title}封面`}
                    />
                  ) : (
                    <div className="journal-poster-inner" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  <span className="journal-index">{clip.index}</span>
                  <span className="journal-pending">
                    {"cover" in clip ? "视频封面" : "待添加视频"}
                  </span>
                  <span className="journal-play" aria-hidden="true">
                    ▶
                  </span>
                </div>
                <div className="journal-caption">
                  <div>
                    <span>{clip.type}</span>
                    <h3>{clip.title}</h3>
                  </div>
                  <p>{clip.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="abilities section-space" id="ability">
        <div className="page-shell">
          <div className="section-display" aria-hidden="true">
            <span>CAPABILITIES</span>
          </div>
          <div className="section-heading section-heading--split">
            <div>
              <span>04 / CAPABILITIES</span>
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
          <div className="section-display section-display--contact" aria-hidden="true">
            <span>CONTACT</span>
          </div>
          <div className="contact-top">
            <span>05 / CONTACT</span>
            <span>LET&apos;S CREATE SOMETHING MEANINGFUL.</span>
          </div>
          <div className="contact-center">
            <p>有一个值得被看见的想法？</p>
            <a className="contact-link-mask" href="mailto:1427954145@qq.com">
              <span>
                LET&apos;S TALK
                <i aria-hidden="true">↗</i>
              </span>
            </a>
          </div>
          <div className="contact-directory">
            <div className="contact-list" aria-label="联系方式">
              <a
                className="contact-item"
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
              <a className="contact-item" href="mailto:1427954145@qq.com">
                <span>QQ / EMAIL</span>
                <strong>1427954145@qq.com</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a
                className="contact-item"
                href="mailto:quejw2117@gmail.com"
              >
                <span>GOOGLE MAIL</span>
                <strong>quejw2117@gmail.com</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a className="contact-item" href="tel:18250030358">
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
