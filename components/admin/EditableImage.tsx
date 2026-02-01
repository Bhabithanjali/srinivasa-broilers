import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { EditableContent, GalleryItem } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface EditableImageProps {
  contentKey: keyof EditableContent;
  className?: string;
  // Fix: Changed altContentKey type from string to keyof EditableContent
  altContentKey?: keyof EditableContent; // Optional: for alternative text
}

export const EditableImage: React.FC<EditableImageProps> = ({ contentKey, className, altContentKey }) => {
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editedImageUrl, setEditedImageUrl] = useState<string>(content[contentKey] as string);
  const [editedAltText, setEditedAltText] = useState<string>(altContentKey ? (content[altContentKey] as string) : '');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await updateContent(contentKey, editedImageUrl);
    if (altContentKey) {
      await updateContent(altContentKey, editedAltText);
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedImageUrl(content[contentKey] as string);
    if (altContentKey) {
      setEditedAltText(content[altContentKey] as string);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`editable-image-editor p-4 bg-gray-50 rounded-lg shadow-inner ${className}`}>
        <img src={editedImageUrl} alt="Preview" className="w-full h-48 object-cover rounded-md mb-4" />
        <Input
          id={`${String(contentKey)}-url`}
          label="Image URL (or upload)"
          type="text"
          value={editedImageUrl}
          onChange={(e) => setEditedImageUrl(e.target.value)}
          className="mb-2"
        />
        <Input
          id={`${String(contentKey)}-file`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
          ref={fileInputRef}
        />
        {altContentKey && (
          <Input
            id={`${String(altContentKey)}-alt`}
            label="Alt Text"
            type="text"
            value={editedAltText}
            onChange={(e) => setEditedAltText(e.target.value)}
            className="mb-4"
          />
        )}
        <div className="flex space-x-2">
          <Button onClick={handleSave} isLoading={isLoading}>Save</Button>
          <Button onClick={handleCancel} variant="secondary">Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="editable-image-wrapper group relative" onDoubleClick={() => setIsEditing(true)}>
      <img
        src={content[contentKey] as string}
        alt={altContentKey ? (content[altContentKey] as string) : 'Editable image'}
        className={`w-full h-full object-cover rounded-lg ${className}`}
      />
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-1 right-1 p-1 bg-gray-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
        aria-label={`Edit ${String(contentKey)}`}
        title={`Edit ${String(contentKey)}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
};

// Generic image upload utility for admin use
export const ImageUpload: React.FC<{ onUpload: (imageUrl: string, altText: string) => void; label?: string; buttonText?: string }> = ({ onUpload, label = 'Upload Image', buttonText = 'Upload' }) => {
    const [file, setFile] = useState<File | null>(null);
    const [altText, setAltText] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            setIsLoading(true);
            // In a real app, this would upload to a server and get a URL
            // For now, we'll use a placeholder or base64 encode
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpload(reader.result as string, altText || file.name);
                setIsLoading(false);
                setFile(null);
                setPreviewUrl(null);
                setAltText('');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm mb-4">
            <h4 className="font-semibold text-textDark mb-2">{label}</h4>
            {previewUrl && <img src={previewUrl} alt="Image Preview" className="max-h-48 w-auto mb-2 rounded-md object-cover" />}
            <Input id="image-upload-file" type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
            <Input id="image-upload-alt" type="text" placeholder="Image Alt Text (e.g., 'Delivery van')" value={altText} onChange={(e) => setAltText(e.target.value)} className="mb-2" />
            <Button onClick={handleSubmit} isLoading={isLoading} disabled={!file} className="w-full">
                {buttonText}
            </Button>
        </div>
    );
};