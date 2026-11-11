import Link from "next/link";
import type { VideoCategory } from "../content/video-library";

const featuredOrder = ["tiktok-20261021-christmas-baking-molds", "beauty-fashion-20261103-beauty-03", "chanel-hand-cream-concept"];

export default function FeaturedFilms({ categories }: { categories: VideoCategory[] }) {
  const videos = categories.flatMap(category => category.videos.filter(video => video.featured).map(video => ({ video, category })));
  const featured = featuredOrder.flatMap(id => videos.filter(item => item.video.id === id));
  if (!featured.length) return null;
  return (
    <section className="featured-films" aria-labelledby="featured-films-title">
      <div className="featured-films__heading"><h3 id="featured-films-title">精选作品</h3><p>三个案例，了解创意与制作过程。</p></div>
      <div className="featured-films__grid">
        {featured.map(({ video, category }) => (
          <Link className="featured-film" key={video.id} href={`/commerce/${category.slug}/#${video.id}`}>
            <img src={video.poster} alt="" loading="lazy" />
            <span className="featured-film__copy"><span className="featured-film__category">{category.title}</span><strong>{video.title}</strong><span className="featured-film__action">查看作品 <span aria-hidden="true">↗</span></span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
