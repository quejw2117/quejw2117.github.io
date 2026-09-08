"use client";

import { useEffect, useRef, useState } from "react";
import "./section-navigation.css";

const sections = [
  { id: "top", label: "首页" },
  { id: "about", label: "关于我" },
  { id: "commerce", label: "AI 带货视频" },
  { id: "work", label: "工作流搭建" },
  { id: "creative-research", label: "创意迭代" },
  { id: "ability", label: "专业能力" },
  { id: "contact", label: "联系我" },
];

export default function SectionNavigation() {
  const [active, setActive] = useState("top");
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const targets = sections.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const updateActive = () => {
      const reached = targets.filter(
        (element) => element.getBoundingClientRect().top <= window.innerHeight * 0.26,
      );
      setActive(reached.at(-1)?.id ?? "top");
    };
    const observer = new IntersectionObserver(updateActive, {
      rootMargin: "-25% 0px -74% 0px",
      threshold: 0,
    });
    targets.forEach((element) => observer.observe(element));
    updateActive();
    window.addEventListener("resize", updateActive);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded]);

  return (
    <nav
      className="section-navigation"
      aria-label="页面板块导航"
      data-expanded={expanded}
      ref={root}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          setExpanded(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
    >
      <button
        className="section-navigation__toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls="section-navigation-links"
        ref={toggle}
        onClick={() => setExpanded((value) => !value)}
      >
        <span aria-hidden="true">{expanded ? "×" : "≡"}</span>
        {expanded ? "收起" : "板块"}
      </button>
      <ol className="section-navigation__links" id="section-navigation-links">
        {sections.map(({ id, label }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setExpanded(false);
                document.getElementById(id)?.focus({ preventScroll: true });
              }}
            >
              <span className="section-navigation__label">{label}</span>
              <span className="section-navigation__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
