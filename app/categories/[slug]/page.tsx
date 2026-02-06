// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2 block">Category</span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h1>
        {category.metadata.description && (
          <p className="text-xl text-gray-500">{category.metadata.description}</p>
        )}
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}