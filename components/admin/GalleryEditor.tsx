import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { GalleryItem } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { ImageUpload } from './EditableImage';

export const GalleryEditor: React.FC = () => {
  const { content, updateContent } = useContent();
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAltText, setNewAltText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const galleryItems = content.galleryItems || [];

  const handleAddItem = async (imageUrl: string, altText: string) => {
    setIsLoading(true);
    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      imageUrl,
      altText,
    };
    const updatedItems = [...galleryItems, newItem];
    await updateContent('galleryItems', updatedItems);
    setNewImageUrl('');
    setNewAltText('');
    setIsModalOpen(false);
    setIsLoading(false);
  };

  const handleUpdateItem = async () => {
    if (editingItem) {
      setIsLoading(true);
      const updatedItems = galleryItems.map((item) =>
        item.id === editingItem.id ? { ...editingItem, imageUrl: newImageUrl, altText: newAltText } : item
      );
      await updateContent('galleryItems', updatedItems);
      setEditingItem(null);
      setNewImageUrl('');
      setNewAltText('');
      setIsModalOpen(false);
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    setIsLoading(true);
    const updatedItems = galleryItems.filter((item) => item.id !== id);
    await updateContent('galleryItems', updatedItems);
    setIsLoading(false);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setNewImageUrl(item.imageUrl);
    setNewAltText(item.altText);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setNewImageUrl('');
    setNewAltText('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setNewImageUrl('');
    setNewAltText('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-textDark mb-4">Manage Gallery</h3>
      <Button onClick={openAddModal} className="mb-6">Add New Image</Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-md">
            <img src={item.imageUrl} alt={item.altText} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-2">
              <Button size="sm" onClick={() => openEditModal(item)}>Edit</Button>
              <Button size="sm" variant="secondary" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
            </div>
            <p className="p-2 text-sm text-center text-textLight">{item.altText}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
        footer={
          <div className="flex space-x-2">
            <Button onClick={closeModal} variant="secondary">Cancel</Button>
            <Button onClick={editingItem ? handleUpdateItem : () => handleAddItem(newImageUrl, newAltText)} isLoading={isLoading}>
              {editingItem ? 'Save Changes' : 'Add Image'}
            </Button>
          </div>
        }
      >
        <Input
          id="image-url"
          label="Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="e.g. https://picsum.photos/600/400"
          className="mb-4"
        />
        <Input
          id="alt-text"
          label="Alt Text"
          value={newAltText}
          onChange={(e) => setNewAltText(e.target.value)}
          placeholder="e.g. Delivery vehicle"
          className="mb-4"
        />
        <p className="text-sm text-gray-600 mb-2">Or upload an image:</p>
        <ImageUpload
            onUpload={(url, alt) => {
              setNewImageUrl(url);
              setNewAltText(alt);
            }}
            label="Upload an image directly"
            buttonText="Set from Upload"
        />
      </Modal>
    </div>
  );
};
