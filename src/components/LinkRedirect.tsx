import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';

const LinkRedirect = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (shortUrl) {
      axios.get(`/api/link/${shortUrl}`)
        .then(response => {
          window.location.href = response.data;
        })
        .catch(error => {
          console.error('Error fetching original URL:', error);
          navigate('/not-found');
        })
        .finally(() => setIsLoading(false));
    }
  }, [shortUrl, navigate]);

  if (isLoading) {
    return <div className="form">Loading...</div>;
  }

  return <div className="form">Redirecting...</div>;
};

export default LinkRedirect;