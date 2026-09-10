import library from "../../content/video-library.json";

export type VideoCase = {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  poster: string;
  task: string;
  role: string;
  direction: string;
  method: string;
  correction: string;
  delivery: string;
  data: string;
};

export type VideoCategory = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  tone: "mass" | "luxury";
  covers: [string, string];
  videos: VideoCase[];
};

export const videoLibrary = library as { categories: VideoCategory[] };

export function findVideoCategory(slug: string) {
  return videoLibrary.categories.find((category) => category.slug === slug);
}
