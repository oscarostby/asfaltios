// src/components/UploadPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [iconImageUrl, setIconImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.asfaltios.com/upload', {
        title,
        mainText,
        iconImageUrl,
        fileUrl,
      });

      if (response.status === 200) {
        setMessage('Item uploaded successfully');
      } else {
        setMessage('Failed to upload item');
      }
    } catch (error) {
      setMessage('An error occurred while uploading the item');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Main Text:</label>
          <textarea
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Icon Image URL:</label>
          <input
            type="text"
            value={iconImageUrl}
            onChange={(e) => setIconImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File URL:</label>
          <input
            type="text"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPage;
