import CommerceArchive from "../../components/CommerceArchive";
import CommerceArchiveV2 from "../../components/CommerceArchiveV2";
import { findVideoCategory, videoLibrary } from "../../content/video-library";

export default function LuxuryArchivePage() {
  const managedCategory = findVideoCategory("luxury");
  if (managedCategory) {
    return <CommerceArchiveV2 category={managedCategory} categories={videoLibrary.categories} />;
  }

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
          task: "围绕蓝宝石的色泽、切面与镶嵌细节制作高价值感商品影像。",
          role: "视觉方向、分镜设计、AI 生成、材质质检、调色与成片交付。",
          direction: "采用暗场珠宝广告语言，以微距和克制镜头突出宝石光泽。",
          method: "多模型测试宝石与金属材质，后期统一黑位、冷暖光和镜头节奏。",
          correction: "重点修正宝石颜色、切面反射、金属爪镶和链条结构。",
          delivery: "9:16 高奢珠宝类 AI 商业短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "高级珠宝系列 01",
          src: "/commerce-videos/luxury-02.mp4",
          poster: "/commerce-videos/luxury-02.jpg",
          task: "以系列化镜头呈现珠宝轮廓、佩戴关系与材质细节。",
          role: "参考研究、镜头脚本、AI 素材生成、剪辑、调色与质检。",
          direction: "强调留白、慢节奏与定向光，让商品成为画面唯一视觉焦点。",
          method: "生成微距和佩戴镜头，后期以节奏、音效和色调建立统一高级感。",
          correction: "校正链条连接、吊坠结构、宝石数量与不同机位下的产品一致性。",
          delivery: "9:16 高奢珠宝类 AI 商业短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "高级珠宝系列 02",
          src: "/commerce-videos/luxury-03.mp4",
          poster: "/commerce-videos/luxury-03.jpg",
          task: "将珠宝产品与人物氛围镜头组合为具有品牌感的视觉短片。",
          role: "人物与产品一致性控制、分镜生成、失败样本修正与后期包装。",
          direction: "以编辑感人物特写衔接珠宝微距，在情绪和商品信息间保持平衡。",
          method: "人物、手部与产品分层生成，后期完成镜头匹配、调色、字幕和声音设计。",
          correction: "修正面部与手部稳定性、佩戴位置、产品比例和镜头间光向变化。",
          delivery: "9:16 高奢珠宝类 AI 商业短视频成片。",
          data: "暂未获得投放数据",
        },
        {
          title: "高级珠宝系列 03",
          src: "/commerce-videos/luxury-04.mp4",
          poster: "/commerce-videos/luxury-04.jpg",
          task: "用短时长建立珠宝系列的统一视觉识别与收藏氛围。",
          role: "创意设定、镜头编排、多模型测试、素材质检与成片交付。",
          direction: "延续克制暗调与雕塑式陈列，通过细微运动展现材质层次。",
          method: "生成陈列、旋转和微距镜头，后期统一速度、光泽、调色与音效。",
          correction: "校正产品尺度、金属反射、宝石形态和连续镜头中的结构漂移。",
          delivery: "9:16 高奢珠宝类 AI 商业短视频成片。",
          data: "暂未获得投放数据",
        },
      ]}
    />
  );
}
