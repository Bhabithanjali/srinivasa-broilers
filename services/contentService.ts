import { EditableContent, UpdateContentPayload } from '../types';
import { INITIAL_EDITABLE_CONTENT } from '../utils/constants'; // Changed to .tsx

const CONTENT_STORAGE_KEY = 'srinivasaBroilersContent';

interface ContentService {
  getContent: () => Promise<EditableContent>;
  updateContent: (payload: UpdateContentPayload) => Promise<EditableContent>;
}

const getStoredContent = (): EditableContent => {
  try {
    const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_EDITABLE_CONTENT;
  } catch (error) {
    console.error('Failed to parse stored content, using initial content:', error);
    return INITIAL_EDITABLE_CONTENT;
  }
};

const saveContent = (content: EditableContent): void => {
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
  } catch (error) {
    console.error('Failed to save content to localStorage:', error);
  }
};

export const contentService: ContentService = {
  getContent: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredContent();
  },

  updateContent: async ({ key, value }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const currentContent = getStoredContent();
    const updatedContent = { ...currentContent, [key]: value };
    saveContent(updatedContent);
    return updatedContent;
  },
};