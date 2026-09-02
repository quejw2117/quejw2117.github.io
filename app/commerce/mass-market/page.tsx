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
      cases={[
        {
          title: "铸铁铸工胶",
          src: "/commerce-videos/mass-01.mp4",
          poster: "/commerce-videos/mass-01.jpg",
          task: "用短视频清晰呈现铸工胶的修补场景、操作过程与粘接结果。",
          role: "参考拆解、分镜规划、AI 素材生成、剪辑包装与成片质检。",
          direction: "以“破损问题、操作演示、修复结果”为主线，强化材质和近景动作。",
          method: "多模型生成关键镜头，后期完成节奏、字幕、音效与产品卖点整理。",
          correction: "重点修正手部动作、工具结构、胶体质感与前后镜头连续性。",
          delivery: "9:16 大众消费类 AI 电商短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "烧烤炉架清洁剂",
          src: "/commerce-videos/mass-02.mp4",
          poster: "/commerce-videos/mass-02.jpg",
          task: "突出油污痛点、清洁动作与使用前后的视觉变化。",
          role: "爆款参考拆解、创意重组、镜头生成、后期剪辑与字幕包装。",
          direction: "用强对比前后效果建立第一眼卖点，并保持清洁流程易理解。",
          method: "按步骤生成脏污、喷涂、擦拭和结果镜头，再以音效与节奏强化变化。",
          correction: "校正炉架结构、液体形态、污渍消退逻辑和动作衔接。",
          delivery: "9:16 大众消费类 AI 电商短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "高压水枪",
          src: "/commerce-videos/mass-03.mp4",
          poster: "/commerce-videos/mass-03.jpg",
          task: "在短时长内说明高压水枪的使用场景、冲洗力度与核心功能。",
          role: "创意方向、分镜、AI 生成、失败镜头筛选、剪辑与成片交付。",
          direction: "以动作冲击和水流反馈为视觉钩子，快速切换典型清洁场景。",
          method: "生成产品特写与使用镜头，后期统一色调、速度、字幕和音效。",
          correction: "重点修正枪体、软管连接、水流方向与产品比例的一致性。",
          delivery: "9:16 大众消费类 AI 电商短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "硬币创意短片",
          src: "/commerce-videos/mass-04.mp4",
          poster: "/commerce-videos/mass-04.jpg",
          task: "通过细节与氛围表现硬币商品的质感、图案和收藏感。",
          role: "视觉设定、镜头编排、AI 素材生成、节奏剪辑与细节质检。",
          direction: "使用微距、金属反射与仪式感构图，提升普通商品的观看价值。",
          method: "多模型测试材质与手持镜头，后期完成调色、音效和节奏控制。",
          correction: "校正硬币纹样、边缘形态、手指接触关系与镜头间尺寸变化。",
          delivery: "9:16 大众消费类 AI 电商短视频成片。",
          data: "暂未获得投放数据",
        },
      ]}
    />
  );
}
