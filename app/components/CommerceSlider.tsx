"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoCategory } from "../content/video-library";

type CommerceSliderProps = {
  categories: VideoCategory[];
};

export default function CommerceSlider({ categories }: CommerceSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".commerce-card"));
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const left = track.scrollLeft + track.offsetLeft;
        const closest = cards.reduce(
          (best, card, index) => {
            const distance = Math.abs(card.offsetLeft - left);
            return distance < best.distance ? { index, distance } : best;
          },
          { index: 0, distance: Number.POSITIVE_INFINITY },
        );
        setActiveIndex(closest.index);
      });
    };

    track.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateActive);
    };
  }, [categories.length]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>(".commerce-card");
    const normalized = (index + categories.length) % categories.length;
    const card = cards?.[normalized];
    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setActiveIndex(normalized);
  };

  return (
    <div className="commerce-slider" aria-roledescription="轮播图">
      <div className="commerce-slider__toolbar">
        <p>
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(categories.length).padStart(2, "0")}</span>
        </p>
        <div className="commerce-slider__buttons" aria-label="切换视频分类">
          <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="上一个分类">
            ←
          </button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="下一个分类">
            →
          </button>
        </div>
      </div>

      <div
        className="commerce-grid"
        ref={trackRef}
        tabIndex={0}
        aria-label="AI 视频分类"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
      >
        {categories.map((category, index) => (
          <a
            className={`commerce-card commerce-card--${category.tone} specular-reactive`}
            href={`/commerce/${category.slug}`}
            key={category.slug}
            aria-label={`查看${category.title}视频案例`}
          >
            <div className="commerce-card__media">
              {category.covers.map((image, imageIndex) => (
                <img
                  className="commerce-card__image"
                  src={image}
                  alt=""
                  key={`${category.slug}-${imageIndex}`}
                  aria-hidden="true"
                  data-layer={imageIndex + 1}
                />
              ))}
              <span className="commerce-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="commerce-card__open">VIEW ARCHIVE ↗</span>
            </div>
            <div className="commerce-card__copy">
              <span>{category.eyebrow}</span>
              <h3>{category.title}</h3>
              <strong>{category.subtitle}</strong>
              <p>{category.description}</p>
            </div>
            <span className="specular-reactive__fx" aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="commerce-slider__pagination" aria-label="选择视频分类">
        {categories.map((category, index) => (
          <button
            type="button"
            key={category.slug}
            aria-label={`转到${category.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
