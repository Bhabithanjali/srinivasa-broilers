import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { EditableContent } from '../../types';
import { Button } from '../common/Button';
import { Textarea } from '../common/Textarea';
import { Input } from '../common/Input';

interface EditableTextProps {
  contentKey: keyof EditableContent;
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'li' | 'textarea' | 'input';
  className?: string;
  isRichText?: boolean; // For future rich text editor integration
}

export const EditableText: React.FC<EditableTextProps> = ({ contentKey, component: Component, className, isRichText = false }) => {
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<string | string[]>(content[contentKey] as string | string[]);
  const [isLoading, setIsLoading] = useState(false);

  // Determine if the content is an array of strings
  const isArrayContent = Array.isArray(content[contentKey]);

  const handleSave = async () => {
    setIsLoading(true);
    await updateContent(contentKey, editedText);
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(content[contentKey] as string | string[]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`editable-text-editor p-4 bg-gray-50 rounded-lg shadow-inner ${className}`}>
        {isArrayContent ? (
          <div className="space-y-2">
            {(editedText as string[]).map((item, index) => (
              <Textarea
                key={index}
                id={`${String(contentKey)}-${index}`}
                value={item}
                onChange={(e) => {
                  const newArray = [...(editedText as string[])];
                  newArray[index] = e.target.value;
                  setEditedText(newArray);
                }}
                rows={2}
                className="text-sm"
              />
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditedText([...(editedText as string[]), ''])}
              className="mt-2"
            >
              Add Item
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditedText((editedText as string[]).slice(0, -1))}
              className="mt-2 ml-2"
              disabled={(editedText as string[]).length <= 1}
            >
              Remove Last
            </Button>
          </div>
        ) : Component === 'textarea' ? (
          <Textarea
            id={String(contentKey)}
            value={editedText as string}
            onChange={(e) => setEditedText(e.target.value)}
            rows={5}
          />
        ) : (
          <Input
            id={String(contentKey)}
            type="text"
            value={editedText as string}
            onChange={(e) => setEditedText(e.target.value)}
          />
        )}
        <div className="mt-4 flex space-x-2">
          <Button onClick={handleSave} isLoading={isLoading}>Save</Button>
          <Button onClick={handleCancel} variant="secondary">Cancel</Button>
        </div>
      </div>
    );
  }

  // Render mode
  const displayContent = isArrayContent ? (
    <ul className="list-disc pl-5 space-y-1">
      {(content[contentKey] as string[]).map((item, index) => (
        <li key={index} className={className}>{item}</li>
      ))}
    </ul>
  ) : (
    <Component className={className}>{content[contentKey] as string}</Component>
  );

  return (
    <div className="editable-text-wrapper group relative" onDoubleClick={() => setIsEditing(true)}>
      {displayContent}
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
