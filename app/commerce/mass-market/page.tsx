import { notFound } from "next/navigation";
import CommerceArchiveV2 from "../../components/CommerceArchiveV2";
import { findVideoCategory, videoLibrary } from "../../content/video-library";

export default function MassMarketArchivePage() {
  const category = findVideoCategory("tiktok-remakes");
  if (!category) notFound();
  return <CommerceArchiveV2 category={category} categories={videoLibrary.categories} />;
}
