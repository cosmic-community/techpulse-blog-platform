// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-16 bg-gray-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-xl">
        {author.metadata.avatar && (
          <img 
            src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format`}
            alt={author.title}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white/20 shadow-lg"
          />
        )}
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            Author Profile
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{author.title}</h1>
          {author.metadata.bio && (
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              {author.metadata.bio}
            </p>
          )}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
            <span>{posts.length} Article{posts.length !== 1 ? 's' : ''} Published</span>
          </div>
        </div>
      </header>

      <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
        Latest from {author.title}
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">This author hasn't published any posts yet.</p>
        </div>
      )}
    </div>
  );
}