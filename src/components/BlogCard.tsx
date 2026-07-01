import type { BlogPost } from '../types/blog'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col h-full">
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-[20px] border border-white/5 bg-navy-950 shadow-md">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-4/3 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <h2 className="mt-5 text-[17px] font-semibold text-white leading-snug tracking-normal">
        <Link to={`/blog/${post.slug}`} className="hover:text-white/95 transition-colors duration-200">
          {post.title}
        </Link>
      </h2>
      <Link
        to={`/blog/${post.slug}`}
        className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-slate-200 font-medium transition-all duration-200 hover:text-white hover:translate-x-0.5"
      >
        Read more <span className="text-[12px] font-semibold">›</span>
      </Link>
    </article>
  )
}

