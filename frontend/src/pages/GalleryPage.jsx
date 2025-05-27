import React, { useState } from 'react';
import AdminGalleryForm from '../admin/AdminGalleryForm';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const addGalleryItem = (item) => {
    setGalleryItems([item, ...galleryItems]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Gallery</h1>
      {/* Show the form for demonstration; in production, show only for admin */}
      <div style={{ marginBottom: 32 }}>
        <AdminGalleryForm onAddPhoto={addGalleryItem} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {galleryItems.length === 0 && (
          <span style={{ color: '#888', fontSize: 16 }}>No gallery items yet.</span>
        )}
        {galleryItems.map((item, idx) => (
          <div key={idx} style={{ width: 240, background: '#fafafa', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 12, marginBottom: 12 }}>
            <a
              href={item.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', marginBottom: 8 }}
            >
              <img
                src={
                  item.driveUrl.includes('drive.google.com')
                    ? `https://drive.google.com/thumbnail?id=${item.driveUrl.split('/d/')[1]?.split('/')[0]}`
                    : item.driveUrl
                }
                alt={item.description || 'Gallery'}
                style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6, background: '#eee' }}
                onError={e => { e.target.src = '/no-image.png'; }}
              />
            </a>
            <div style={{ fontSize: 15, color: '#333', textAlign: 'center', minHeight: 40 }}>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;