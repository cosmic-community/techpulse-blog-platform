# TechPulse Blog Platform

A modern, responsive blog application built with Next.js 16 and Cosmic CMS, specifically designed for tech news and reviews.

## Features
- **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, and Tailwind CSS.
- **Dynamic Routing**: Dedicated pages for posts, categories, and authors.
- **Rich Content**: Markdown rendering with typography optimization.
- **Responsive Design**: Mobile-first approach ensuring great experience on all devices.
- **Performance**: Server-side rendering for optimal SEO and load times.

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6985ee02c8c4b2550dcd3128&clone_repository=6985eeeac8c4b2550dcd31e8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories. Android Quick Share works with AirDrop® on Pixel 10"

### Code Generation Prompt

> "Based on the content model I created for a blog with posts, authors, and categories... now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Icons**: Lucide React
- **Markdown**: React Markdown

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/techpulse-blog.git
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

## Deployment
This project is optimized for deployment on Vercel or Netlify. Ensure you add the environment variables in your deployment settings.

<!-- README_END -->