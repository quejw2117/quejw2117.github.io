import CommerceArchive from "../../components/CommerceArchive";

export default function LuxuryArchivePage() {
  return (
    <CommerceArchive
      category="高奢珠宝"
      eyebrow="HIGH JEWELRY / LUXURY VISUAL"
      description="以珠宝、贵金属和高价值商品为核心，通过材质控制、精确布光与克制节奏，建立更具收藏感与品牌感的商业影像。"
      images={["/commerce-luxury-01.png", "/commerce-luxury-02.png"]}
      alternateHref="/commerce/mass-market"
      alternateLabel="查看大众消费"
      tone="luxury"
      cases={[
        {
          title: "蓝宝石珠宝",
          src: "/commerce-videos/luxury-01.mp4",
          poster: "/commerce-videos/luxury-01.jpg",
        },
        {
          title: "高级珠宝系列 01",
          src: "/commerce-videos/luxury-02.mp4",
          poster: "/commerce-videos/luxury-02.jpg",
        },
        {
          title: "高级珠宝系列 02",
          src: "/commerce-videos/luxury-03.mp4",
          poster: "/commerce-videos/luxury-03.jpg",
        },
        {
          title: "高级珠宝系列 03",
          src: "/commerce-videos/luxury-04.mp4",
          poster: "/commerce-videos/luxury-04.jpg",
        },
      ]}
    />
  );
}
