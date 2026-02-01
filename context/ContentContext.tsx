import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EditableContent, ContentContextType } from '../types';
import { contentService } from '../services/contentService';
import { INITIAL_EDITABLE_CONTENT } from '../utils/constants'; // Changed to .tsx

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [content, setContent] = useState<EditableContent>(INITIAL_EDITABLE_CONTENT);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedContent = await contentService.getContent();
      setContent(fetchedContent);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Fallback to initial content if fetching fails
      setContent(INITIAL_EDITABLE_CONTENT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const updateContent = useCallback(async (key: keyof EditableContent, value: any) => {
    setIsLoading(true);
    try {
      const updated = await contentService.updateContent({ key, value });
      setContent(updated);
    } catch (error) {
      console.error(`Error updating content for key ${String(key)}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    content,
    updateContent,
    isLoading,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};