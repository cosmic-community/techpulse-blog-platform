import Link from 'next/link';
import { getAllCategories } from '@/lib/cosmic';

export default async function Footer() {
  const categories = await getAllCategories();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-bold text-xl text-gray-900 mb-4 block">
              TechPulse
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your daily source for the latest tech news, reviews, and deep dives. 
              Powered by Cosmic CMS.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map(category => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-500 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-900 text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gray-900 text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TechPulse. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}