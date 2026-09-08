import type { Metadata } from "next";
import "./globals.css";
import "./taste-upgrade.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://que-jiawei-portfolio.quejw2117.chatgpt.site"),
    title: "阙嘉炜 | 视觉设计与 AIGC 创意",
    description:
      "阙嘉炜的个人作品集：视觉设计、AIGC 商业影像、品牌内容与智能创意工作流。",
    openGraph: {
      title: "阙嘉炜 | Visual Designer × AI Creator",
      description: "用视觉、影像与智能工作流，让创意规模化落地。",
      type: "website",
      images: [{ url: "/og.png", width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "阙嘉炜 | Visual Designer × AI Creator",
      description: "用视觉、影像与智能工作流，让创意规模化落地。",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
