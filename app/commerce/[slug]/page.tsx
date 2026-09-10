import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommerceArchiveV2 from "../../components/CommerceArchiveV2";
import { findVideoCategory, videoLibrary } from "../../content/video-library";

export const dynamicParams = false;

export function generateStaticParams() {
  return videoLibrary.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = findVideoCategory((await params).slug);
  return category ? { title: `${category.title} AI 视频｜阙嘉炜`, description: category.description } : {};
}

export default async function CommerceArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const category = findVideoCategory((await params).slug);
  if (!category) notFound();
  return <CommerceArchiveV2 category={category} categories={videoLibrary.categories} />;
}
