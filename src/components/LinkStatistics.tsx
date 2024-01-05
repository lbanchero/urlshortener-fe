import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const LinkStatistics = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/link/${shortUrl}/stats`);
        setClicks(response.data.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [shortUrl]);

  return (
    <div className="form">
      <h3>Statistics for {shortUrl}</h3>
      <p>Clicks: {clicks}</p>
    </div>
  );
};

export default LinkStatistics;