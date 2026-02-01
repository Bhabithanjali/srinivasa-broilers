import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { BlogPost } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Modal } from '../common/Modal';
import { ImageUpload } from './EditableImage';

export const BlogEditor: React.FC = () => {
  const { content, updateContent } = useContent();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id' | 'date'>>({
    title: '',
    author: '',
    imageUrl: '',
    content: '',
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const blogPosts = content.blogPosts || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'tags') {
      setFormData((prev) => ({ ...prev, tags: value.split(',').map((tag) => tag.trim()).filter(Boolean) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleImageUrlUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (editingPost) {
      // Update existing post
      const updatedPosts = blogPosts.map((post) =>
        post.id === editingPost.id
          ? { ...post, ...formData, date: new Date().toISOString().split('T')[0] } // Update date on edit
          : post
      );
      await updateContent('blogPosts', updatedPosts);
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        ...formData,
      };
      const updatedPosts = [...blogPosts, newPost];
      await updateContent('blogPosts', updatedPosts);
    }
    setIsLoading(false);
    closeModal();
  };

  const handleDeletePost = async (id: string) => {
    setIsLoading(true);
    const updatedPosts = blogPosts.filter((post) => post.id !== id);
    await updateContent('blogPosts', updatedPosts);
    setIsLoading(false);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      imageUrl: post.imageUrl,
      content: post.content,
      tags: post.tags,
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      author: '',
      imageUrl: '',
      content: '',
      tags: [],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-textDark mb-4">Manage Blog Posts</h3>
      <Button onClick={openAddModal} className="mb-6">Create New Post</Button>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={post.imageUrl || 'https://picsum.photos/100/70?random=0'} alt={post.title} className="w-24 h-16 object-cover rounded-md" />
              <div>
                <h4 className="font-semibold text-textDark">{post.title}</h4>
                <p className="text-sm text-textLight">by {post.author} on {post.date}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => openEditModal(post)}>Edit</Button>
              <Button size="sm" variant="secondary" onClick={() => handleDeletePost(post.id)} className="bg-red-400 hover:bg-red-500">Delete</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
        footer={
          <div className="flex space-x-2">
            <Button onClick={closeModal} variant="secondary">Cancel</Button>
            <Button onClick={handleSave} isLoading={isLoading}>
              {editingPost ? 'Save Changes' : 'Create Post'}
            </Button>
          </div>
        }
      >
        <Input id="title" label="Title" value={formData.title} onChange={handleChange} className="mb-4" />
        <Input id="author" label="Author" value={formData.author} onChange={handleChange} className="mb-4" />
        <Input id="imageUrl" label="Image URL" value={formData.imageUrl} onChange={handleChange} placeholder="e.g. https://picsum.photos/800/600" className="mb-4" />
        <p className="text-sm text-gray-600 mb-2">Or upload an image for the blog post:</p>
        <ImageUpload
            onUpload={(url) => handleImageUrlUpload(url)}
            label="Upload Featured Image"
            buttonText="Set from Upload"
        />
        <Textarea id="content" label="Content" value={formData.content} onChange={handleChange} rows={8} className="mb-4" />
        <Input id="tags" label="Tags (comma-separated)" value={formData.tags.join(', ')} onChange={handleChange} className="mb-4" />
      </Modal>
    </div>
  );
};
