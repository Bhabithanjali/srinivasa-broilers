import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { BlogEditor } from '../components/admin/BlogEditor';

export const AdminBlog: React.FC = () => {
  return (
    <div className="space-y-8">
      <SectionTitle title="Manage Blog Posts" subtitle="Blog" className="!text-left !mb-6" />
      <BlogEditor />
    </div>
  );
};
