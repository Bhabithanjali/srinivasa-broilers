import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export const Blog: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  const blogPosts = content.blogPosts || [];

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Blog" subtitle="Insights & Updates" />

        {blogPosts.length === 0 ? (
          <p className="text-center text-lg text-textLight">No blog posts available yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-textDark mb-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-textLight mb-4 space-x-4">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-primary" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <FaUser className="mr-2 text-primary" /> {post.author}
                    </span>
                  </div>
                  <p className="text-textLight mb-5 flex-grow">
                    {post.content.substring(0, 150)}...
                  </p>
                  <Link to={`/blog/${post.id}`} className="inline-block text-primary font-semibold hover:text-primaryDark transition-colors duration-200 mt-auto">
                    Read More &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
