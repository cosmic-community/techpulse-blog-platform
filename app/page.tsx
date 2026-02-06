import { getAllPosts } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          The Pulse of <span className="text-blue-600">Technology</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Deep dives into hardware, software, and the ecosystems that connect them.
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">No posts found. Add some content in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  );
}