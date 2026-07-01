import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlogStore } from '../cotexts/blogStore'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { activeBlog, fetchBlogBySlug, loading } = useBlogStore()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (slug) {
      fetchBlogBySlug(slug)
    }
  }, [slug, fetchBlogBySlug])

  // Dynamic SEO Injection
  useEffect(() => {
    if (activeBlog) {
      // Set Document Title
      document.title = activeBlog.meta_title || activeBlog.title

      // Set Meta Description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', activeBlog.meta_description || activeBlog.excerpt || '')

      // Set Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', activeBlog.meta_keywords || '')
    }

    return () => {
      // Restore default title on unmount
      document.title = 'WonderTales Hub'
    }
  }, [activeBlog])

  if (loading) {
    return (
      <div className="min-h-[85vh] bg-navy-950 px-6 py-32 text-center flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-slate-400 font-sans">Unveiling story details...</p>
      </div>
    )
  }

  if (!activeBlog) {
    return (
      <div className="min-h-[85vh] bg-navy-950 px-6 py-32 text-center text-slate-300 lg:px-8 relative overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <h2 className="font-serif text-3xl text-white">Blog not found</h2>
        <p className="mt-4 text-sm text-slate-400 font-sans">The story you're looking for is not available yet.</p>
        <Link to="/blogs" className="mt-6 inline-flex items-center gap-2 text-gold hover:underline font-sans text-sm">
          &larr; Back to all blogs
        </Link>
      </div>
    )
  }

  // Format the title: split at the colon to style the first part gold and the second part white
  const renderTitle = (title: string) => {
    const colonIndex = title.indexOf(':')
    if (colonIndex !== -1) {
      const part1 = title.substring(0, colonIndex + 1)
      const part2 = title.substring(colonIndex + 1)
      return (
        <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] font-bold leading-tight tracking-tight mb-8">
          <span className="text-gold block sm:inline">{part1}</span>
          <span className="text-white block sm:inline sm:ml-2">{part2}</span>
        </h1>
      )
    }
    return (
      <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[50px] font-bold leading-tight tracking-tight text-gold mb-8">
        {title}
      </h1>
    )
  }

  // Custom text content renderer to turn plain text with lists/headings into beautiful HTML structure
  const renderContent = (content: string) => {
    if (!content) return null

    // If it's already HTML (e.g. contains paragraph tags), render it as HTML
    if (content.includes('<p>') || content.includes('<br>') || content.includes('<ul>')) {
      return (
        <div
          className="prose prose-invert prose-gold max-w-none text-slate-200 leading-relaxed font-sans space-y-6 text-[16px] sm:text-[17px] [&_h2]:font-serif [&_h2]:text-gold [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_ul]:list-none [&_ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:my-4 [&_strong]:text-white [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )
    }

    // Otherwise, parse plain text block-by-block
    const blocks = content.split('\n\n')
    return (
      <div className="space-y-6 text-[16px] sm:text-[17px] text-slate-200 leading-relaxed font-sans">
        {blocks.map((block, idx) => {
          const trimmed = block.trim()
          if (!trimmed) return null

          // Headings like "1. Set the Stage", "2. Master Your Delivery" or "The Ultimate Benefit"
          if (/^\d+\.\s+/.test(trimmed) || trimmed === 'The Ultimate Benefit') {
            return (
              <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-gold mt-12 mb-5 font-bold tracking-wide">
                {trimmed}
              </h2>
            )
          }

          // Bullet list block
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const items = trimmed.split('\n').map(item => item.replace(/^[•\-*]\s*/, '').trim())
            return (
              <ul key={idx} className="space-y-4 my-6 list-none pl-0">
                {items.map((item, i) => {
                  const boldMatch = item.match(/^\*\*(.*?)\*\*(.*)/) || item.match(/^(.*?):(.*)/)
                  if (boldMatch) {
                    const titleText = boldMatch[1].trim()
                    const descText = boldMatch[2].trim()
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gold text-lg leading-none mt-1.5 select-none">•</span>
                        <span>
                          <strong className="text-white font-semibold">{titleText}: </strong>
                          <span className="text-slate-200">{descText}</span>
                        </span>
                      </li>
                    )
                  }
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold text-lg leading-none mt-1.5 select-none">•</span>
                      <span className="text-slate-200">{item}</span>
                    </li>
                  )
                })}
              </ul>
            )
          }

          // Normal Paragraph with bold inline text conversion
          return (
            <p key={idx} className="leading-relaxed">
              {trimmed.split('**').map((part, i) => {
                if (i % 2 === 1) {
                  return <strong key={i} className="text-white font-semibold">{part}</strong>
                }
                return part
              })}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 max-w-360 mx-auto w-11/12 overflow-hidden animate-fade-in-up">
      {/* Soft background glows matching the mockup lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-225 h-125 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-[20%] w-87.5 h-87.5 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className=" relative z-10">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-gold text-xs uppercase tracking-wider font-semibold transition-colors duration-200 mb-8 font-sans"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Blogs
        </Link>

        {renderTitle(activeBlog.title)}

        {activeBlog.image && (
          <div className="mt-8 mb-10 overflow-hidden rounded-[20px] shadow-2xl border border-white/5 bg-navy-950">
            <img
              src={activeBlog.image}
              alt={activeBlog.title}
              className="w-full object-cover aspect-video"
            />
          </div>
        )}

        <article className="mt-10">
          {renderContent(activeBlog.content || '')}
        </article>
      </div>
    </div>
  )
}

