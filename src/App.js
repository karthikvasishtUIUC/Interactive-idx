import React, { useState, useMemo } from 'react';
import MusicTable from './components/MusicTable';
import { Container, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import songs from '../src/Songs4.json';  // Ensure this path correctly points to your JSON file
import './styles/App.css';

const App = () => {
  const [filters, setFilters] = useState({});

  const filteredSongs = useMemo(() => {
    return Object.keys(filters).length === 0
      ? songs['Song List v2 ']
      : songs['Song List v2 '].filter(song =>
        Object.keys(filters).every(attribute =>
          filters[attribute].length === 0 || filters[attribute].includes(song[attribute])
        )
      );
  }, [filters]);

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
        </Box>
      </Box>
    </Container>
  );
};

export default App;
