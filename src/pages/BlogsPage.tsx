import { useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import { useBlogStore } from '../cotexts/blogStore'

export default function BlogsPage() {
  const { blogs, fetchBlogs, loading } = useBlogStore()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlogs()
  }, [fetchBlogs])

  return (
    <div className="relative min-h-[80vh] pt-32 pb-24  overflow-hidden">
      {/* Soft, premium radial glow at the top center, matching the mockup's light effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-360 w-11/12 relative z-10">
        <h1 className="font-serif text-[40px] sm:text-[46px] md:text-[52px] font-bold text-white tracking-tight leading-tight mb-12">
          <span className="text-gold">Blogs</span> for Children
        </h1>

        {loading && blogs.length === 0 ? (
          <div className="mt-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-slate-400">Loading magic stories...</p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

