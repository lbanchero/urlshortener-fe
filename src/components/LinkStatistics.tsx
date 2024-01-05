import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';

const LinkStatistics = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await axios.delete(`/api/link/${shortUrl}`).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/link/${shortUrl}/stats`);
        setClicks(response.data.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
        navigate('/not-found');
      }
    };

    fetchStats();
  }, [shortUrl]);

  return (
    <div className="form">
      <h3>Statistics for {shortUrl}</h3>
      <p>Clicks: {clicks}</p>

      <button type="button" className="deleteButton" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default LinkStatistics;