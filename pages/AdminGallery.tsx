import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { GalleryEditor } from '../components/admin/GalleryEditor';

export const AdminGallery: React.FC = () => {
  return (
    <div className="space-y-8">
      <SectionTitle title="Manage Website Gallery" subtitle="Gallery" className="!text-left !mb-6" />
      <GalleryEditor />
    </div>
  );
};
