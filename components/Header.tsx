import Link from 'next/link';
import { getAllCategories } from '@/lib/cosmic';

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 tracking-tight">
          <span className="bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-lg">TP</span>
          TechPulse
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Latest
          </Link>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu trigger could go here */}
          <Link href="/" className="text-sm font-medium text-gray-600">
            Menu
          </Link>
        </div>
      </div>
    </header>
  );
}