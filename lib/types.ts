export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  type: string;
  created_at: string;
  modified_at: string;
  metadata: Record<string, any>;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    avatar: CosmicImage;
    bio?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    excerpt: string;
    content: string;
    hero_image: CosmicImage;
    author: Author;
    categories?: Category[];
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}