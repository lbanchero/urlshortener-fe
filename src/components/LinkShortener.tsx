import React, { useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const LinkShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const fullUrl = window.location.href + shortenedLink;
  const statsUrl = window.location.href + "stats/" + shortenedLink;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (url.trim() !== '') {
      try {
        const response = await axios.post('/api/link', { url });
        setShortenedLink(response.data.shortCode);
      } catch (error) {
        console.error('Error shortening link:', error);
      }
    } else {
      console.error('URL is required');
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
        <button type="submit">Short Link</button>
      </form>
      {shortenedLink && <p>Shortened Link: <Link to={fullUrl}>{fullUrl}</Link></p>}
      {shortenedLink && <p>Stats Link: <Link to={statsUrl}>{statsUrl}</Link></p>}

    </div>
  );
};

export default LinkShortener;