import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import songs from '../Songs4.json';
import '../styles/App.css'; // Ensure this path points to your CSS file

const attributeList = [
  "TRACK", "ARTIST", "YEAR", "GENRE",
  "AQUATIC REFERENCE", "WEATHER/CLIMATE", "RITUAL/ACT", "VESSEL/INFRASTRUCTURE", "CONTEXT"
];

const columnStyles = {
  TRACK: { minWidth: '28px', maxWidth: '28px' },
  ARTIST: { minWidth: '10px', maxWidth: '10px' },
  YEAR: { minWidth: '5px', maxWidth: '5px' },
  GENRE: { minWidth: '5px', maxWidth: '5px' },
  "AQUATIC REFERENCE": { minWidth: '5px', maxWidth: '5px' },
  "WEATHER/CLIMATE": { minWidth: '5px', maxWidth: '5px' },
  "RITUAL/ACT": { minWidth: '5px', maxWidth: '5px' },
  "VESSEL/INFRASTRUCTURE": { minWidth: '5px', maxWidth: '5px' },
  CONTEXT: { minWidth: '5px', maxWidth: '5px' }
};

const AnimatedCount = ({ count }) => {
  const springProps = useSpring({ number: count, from: { number: 0 }, config: { duration: 500 } });
  return <animated.span>{springProps.number.to(n => Math.floor(n))}</animated.span>;
};

const MusicTable = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedValues, setHighlightedValues] = useState({});

  const handleValueClick = (attribute, value) => {
    setHighlightedValues(prev => ({
      ...prev,
      [attribute]: value,
    }));
  };

  const handleReset = () => {
    setFilters({});
    setSearchQuery("");
    setHighlightedValues({});
  };

  const filteredSongs = useMemo(() => {
    return songs['Song List v2 '].filter(song =>
      Object.keys(filters).every(attr => !filters[attr].length || filters[attr].includes(song[attr])) &&
      (searchQuery === "" || Object.values(song).some(value => value.toString().toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [filters, searchQuery]);

  const uniqueValuesWithCounts = useMemo(() => {
    const counts = {};
    songs['Song List v2 '].forEach(song => {
      attributeList.forEach(attr => {
        const value = song[attr];
        if (value && filteredSongs.includes(song)) {
          counts[attr] = counts[attr] || {};
          counts[attr][value] = (counts[attr][value] || 0) + 1;
        }
      });
    });
    return counts;
  }, [filteredSongs]);

  const trackCount = filteredSongs.length;
  const props = useSpring({ number: trackCount, from: { number: 0 } });

  return (
    <div>
      <div className="track-counter">
        <Typography variant="h6">
          Total Tracks: <animated.span>{props.number.to(n => n.toFixed(0))}</animated.span>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1800 }} aria-label="simple table" style={{ tableLayout: 'fixed', width: 'auto' }}>
          <TableHead>
            <TableRow>
              {attributeList.map(attr => (
                <TableCell key={attr} style={{ ...columnStyles[attr], backgroundColor: '#000', color: '#fff', whiteSpace: 'nowrap' }}>
                  {attr}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {attributeList.map(attribute => (
                <TableCell key={attribute} style={{ ...columnStyles[attribute], verticalAlign: 'top' }}>
                  <strong>{attribute}:</strong>
                  <div className="unique-values-container">
                    {uniqueValuesWithCounts[attribute] && Object.entries(uniqueValuesWithCounts[attribute]).map(([value, count], index) => {
                      const isSelected = highlightedValues[attribute] === value;
                      return (
                        <div
                          key={index}
                          className="unique-value"
                          onClick={() => handleValueClick(attribute, value)}
                          style={{
                            fontWeight: isSelected ? 'bold' : 'normal',
                            color: isSelected ? 'inherit' : 'lightgrey',
                            cursor: 'pointer'
                          }}
                        >
                          {value} {attribute !== "TRACK" && attribute !== "ARTIST" && <AnimatedCount count={count} />}
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MusicTable;
