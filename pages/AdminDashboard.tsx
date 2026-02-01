import React from 'react';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/admin/EditableText';
import { EditableImage } from '../components/admin/EditableImage';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { SectionTitle } from '../components/common/SectionTitle';

export const AdminDashboard: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="text-center py-8 text-lg text-textLight">Loading admin content...</div>;
  }

  return (
    <div className="space-y-10">
      <SectionTitle title="Welcome to Admin Dashboard" subtitle="Manage Your Website" className="!text-left !mb-6" />

      {/* Quick Links / Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-textDark mb-3">Manage Orders</h3>
          <p className="text-textLight mb-4">View and update the status of all hen orders.</p>
          <Link to="/admin/orders">
            <Button>View Orders</Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-textDark mb-3">Manage Gallery</h3>
          <p className="text-textLight mb-4">Add, edit, or remove images from your gallery.</p>
          <Link to="/admin/gallery">
            <Button>Edit Gallery</Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-textDark mb-3">Manage Blog Posts</h3>
          <p className="text-textLight mb-4">Create, edit, or delete blog articles.</p>
          <Link to="/admin/blog">
            <Button>Edit Blog</Button>
          </Link>
        </div>
      </div>

      {/* Home Page Content Editing */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Home Page Content</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Hero Heading:</h3>
            <EditableText contentKey="homeHeroHeading" component="h1" className="text-4xl font-extrabold text-primary-dark" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Hero Description:</h3>
            <EditableText contentKey="homeDescription" component="p" className="text-lg text-textLight" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Service Highlights:</h3>
            <EditableText contentKey="homeServiceHighlights" component="li" />
          </div>
        </div>
      </div>

      {/* About Us Page Content Editing */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">About Us Page Content</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Introduction:</h3>
            <EditableText contentKey="aboutIntro" component="p" className="text-lg text-textLight" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Service Area Information:</h3>
            <EditableText contentKey="aboutServiceArea" component="p" className="text-lg text-textLight" />
          </div>
        </div>
      </div>

      {/* Services Page Content Editing */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Services Page Content</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Services List:</h3>
            <EditableText contentKey="servicesList" component="li" />
          </div>
        </div>
      </div>

      {/* Facilities Page Content Editing */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Facilities Page Content</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-textDark mb-2">Facilities List:</h3>
            <EditableText contentKey="facilitiesList" component="li" />
          </div>
        </div>
      </div>
    </div>
  );
};
