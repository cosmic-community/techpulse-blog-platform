import { createBucketClient } from '@cosmicjs/sdk';
import { Post, Category, Author } from './types';

// Initialize Cosmic Client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'android-quick-share-works-with-airdrop-on-pixel-10-production',
  readKey: process.env.COSMIC_READ_KEY || 'qrKVDLPAh8uGcF63i9JGtwt9sAKfX16ET1pnKZW7etRrENv2hi',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
});

// Helper to check for errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'created_at', 'metadata'])
      .depth(2);
    
    return (response.objects || []) as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'created_at', 'metadata'])
      .depth(2);
      
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

// Fetch posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    // First find the category ID to query relationships
    const categoryResponse = await cosmic.objects
      .findOne({ type: 'categories', slug: categorySlug })
      .props(['id']);
      
    const categoryId = categoryResponse.object.id;
    
    // Now find posts with this category ID in their metadata
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.categories': categoryId
      })
      .props(['id', 'slug', 'title', 'created_at', 'metadata'])
      .depth(2);
      
    return (response.objects || []) as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  try {
    // First find the author ID
    const authorResponse = await cosmic.objects
      .findOne({ type: 'authors', slug: authorSlug })
      .props(['id']);
      
    const authorId = authorResponse.object.id;
    
    // Find posts by this author
    const response = await cosmic.objects
      .find({ 
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'slug', 'title', 'created_at', 'metadata'])
      .depth(2);
      
    return (response.objects || []) as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    console.error(`Error fetching posts for author ${authorSlug}:`, error);
    return [];
  }
}

// Get single category details
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata']);
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    return null;
  }
}

// Get single author details
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'slug', 'title', 'metadata']);
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    return null;
  }
}

// Get all categories for navigation
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title']);
    return (response.objects || []) as Category[];
  } catch (error) {
    return [];
  }
}