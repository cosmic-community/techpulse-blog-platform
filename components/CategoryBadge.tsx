import Link from 'next/link';

export default function CategoryBadge({ title, slug, className }: { title: string; slug: string; className?: string }) {
  return (
    <Link 
      href={`/categories/${slug}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors ${className || ''}`}
    >
      {title}
    </Link>
  );
}