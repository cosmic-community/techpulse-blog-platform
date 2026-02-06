// app/posts/[slug]/page.tsx
import { getPostBySlug } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Calendar, Tag } from 'lucide-react';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 16, params is a Promise that must be awaited
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, metadata, created_at } = post;
  const { author, categories } = metadata;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Category Tags */}
      {categories && categories.length > 0 && (
        <div className="flex gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-8 leading-tight">
        {title}
      </h1>

      {/* Meta Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-gray-500 text-sm border-b border-gray-100 pb-8">
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 hover:text-gray-900 transition-colors group">
            {author.metadata.avatar && (
              <img 
                src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format`} 
                alt={author.title}
                className="w-10 h-10 rounded-full object-cover group-hover:ring-2 ring-blue-100 transition-all"
              />
            )}
            <div className="text-left">
              <span className="block font-medium text-gray-900">{author.title}</span>
              <span className="text-xs">Author</span>
            </div>
          </Link>
        )}
        
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={created_at}>
            {format(new Date(created_at), 'MMMM d, yyyy')}
          </time>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-12 bg-gray-100">
        <img 
          src={`${metadata.hero_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-xl">
        <ReactMarkdown>{metadata.content}</ReactMarkdown>
      </div>

      {/* Author Bio Footer */}
      {author && (
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
          {author.metadata.avatar && (
            <Link href={`/authors/${author.slug}`} className="flex-shrink-0">
              <img 
                src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format`}
                alt={author.title}
                className="w-20 h-20 rounded-full object-cover shadow-sm hover:scale-105 transition-transform"
              />
            </Link>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Written by <Link href={`/authors/${author.slug}`} className="hover:underline">{author.title}</Link>
            </h3>
            {author.metadata.bio && (
              <p className="text-gray-600 leading-relaxed">{author.metadata.bio}</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}