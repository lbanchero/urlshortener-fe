import React, { useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const LinkShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const fullUrl = window.location.href + shortenedLink;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/link', { url });
      setShortenedLink(response.data.shortCode);
    } catch (error) {
      console.error('Error shortening link:', error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortenedLink && <p>Shortened Link: <Link to={fullUrl}>{fullUrl}</Link></p>}
    </div>
  );
};

export default LinkShortener;