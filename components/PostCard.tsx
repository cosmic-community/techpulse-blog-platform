import Link from 'next/link';
import { Post } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';

export default function PostCard({ post }: { post: Post }) {
  const author = post.metadata.author;
  const categories = post.metadata.categories || [];
  
  return (
    <article className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
      <Link href={`/posts/${post.slug}`} className="block relative overflow-hidden aspect-[16/9]">
        <img 
          src={`${post.metadata.hero_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          width={800}
          height={450}
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map(category => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          {post.metadata.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {author && (
              <Link href={`/authors/${author.slug}`} className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                {author.metadata.avatar && (
                  <img 
                    src={`${author.metadata.avatar.imgix_url}?w=40&h=40&fit=crop&auto=format`}
                    alt={author.title}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span>{author.title}</span>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}