"use client";

import {
  useRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type PointerEvent,
} from "react";

type SpecularLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  radius?: number;
};

export default function SpecularLink({
  children,
  className = "",
  radius = 2,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: SpecularLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const link = linkRef.current;

    if (link) {
      const rect = link.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const angle =
        Math.atan2(
          event.clientY - (rect.top + rect.height / 2),
          event.clientX - (rect.left + rect.width / 2),
        ) *
          (180 / Math.PI) +
        90;

      link.style.setProperty("--specular-x", `${x}px`);
      link.style.setProperty("--specular-y", `${y}px`);
      link.style.setProperty("--specular-angle", `${angle}deg`);
      link.style.setProperty("--specular-active", "1");
    }

    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    linkRef.current?.style.setProperty("--specular-active", "0");
    onPointerLeave?.(event);
  };

  return (
    <a
      ref={linkRef}
      className={`specular-link ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          ...style,
          "--specular-radius": `${radius}px`,
        } as CSSProperties
      }
      {...props}
    >
      <span className="specular-link__label">{children}</span>
    </a>
  );
}
