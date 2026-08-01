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
    />
  );
}
