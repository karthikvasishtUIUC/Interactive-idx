import React, { useState, useMemo } from 'react';
import MusicTable from './components/MusicTable';
import ResetButton from './components/ResetButton';
import TrackCounter from './components/TrackCounter';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import songs from '../src/Songs4.json';  // Ensure this path correctly points to your JSON file
import './styles/App.css';

const App = () => {
  const [filters, setFilters] = useState({});

  // Compute filtered songs based on current filters
  const filteredSongs = useMemo(() => {
    return Object.keys(filters).length === 0
        ? songs['Song List v2 ']
        : songs['Song List v2 '].filter(song =>
            Object.keys(filters).every(attribute =>
                filters[attribute].length === 0 || filters[attribute].includes(song[attribute])
            )
        );
  }, [filters]);

  // Function to reset filters
  const resetFilters = () => setFilters({});

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 4 }}>
        <Typography variant="h1" style={{ textAlign: 'center', marginBottom: '20px', background: '-webkit-linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2.5rem', fontWeight: 'bold', color: '#424242', fontFamily: "'Montserrat', sans-serif" }}>
          Interactive Music Dashboard
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Box sx={{ width: '100%' }}>
            <MusicTable filters={filters} setFilters={setFilters} songs={filteredSongs} />
          </Box>
          <Box sx={{ minWidth: '200px', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TrackCounter totalTracks={filteredSongs.length} />
            <ResetButton onReset={resetFilters} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
