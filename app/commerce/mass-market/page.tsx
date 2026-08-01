import CommerceArchive from "../../components/CommerceArchive";

export default function MassMarketArchivePage() {
  return (
    <CommerceArchive
      category="大众消费"
      eyebrow="MASS MARKET / DAILY COMMERCE"
      description="面向服饰、家居、美妆与日用商品的高频商业内容，以清晰卖点、场景化表达和稳定产能服务商品转化。"
      images={["/commerce-mass-01.png", "/commerce-mass-02.png"]}
      alternateHref="/commerce/luxury"
      alternateLabel="查看高奢珠宝"
      tone="mass"
    />
  );
}
