import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkShortener from './components/LinkShortener';
import LinkStatistics from './components/LinkStatistics';
import NotFound from './components/NotFound';
import LinkRedirect from './components/LinkRedirect';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LinkShortener />} />
          <Route path="/:shortUrl" element={<LinkRedirect />} />
          <Route path="/stats/:shortUrl" element={<LinkStatistics />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;