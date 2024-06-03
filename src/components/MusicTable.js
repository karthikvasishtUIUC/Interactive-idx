import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import songs from '../Songs4.json';
import '../styles/App.css'; // Ensure this path points to your CSS file

const attributeList = [
  "TRACK", "ARTIST", "YEAR", "GENRE", 
  "AQUATIC REFERENCE", "WEATHER/CLIMATE", "RITUAL/ACT", "VESSEL/INFRASTRUCTURE", "CONTEXT"
];

const MusicTable = ({ filters, setFilters, songs }) => {
  const handleValueClick = (attribute, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (!newFilters[attribute]) {
        newFilters[attribute] = [value];
      } else if (newFilters[attribute].includes(value)) {
        newFilters[attribute] = newFilters[attribute].filter(v => v !== value);
        if (newFilters[attribute].length === 0) {
          delete newFilters[attribute];
        }
      } else {
        newFilters[attribute].push(value);
      }
      return newFilters;
    });
  };

  const uniqueValuesWithCounts = useMemo(() => {
    const counts = {};
    songs.forEach(song => {
      attributeList.forEach(attr => {
        const value = song[attr];
        if (value) {
          counts[attr] = counts[attr] || {};
          counts[attr][value] = (counts[attr][value] || 0) + 1;
        }
      });
    });
    return counts;
  }, [songs]);

  return (
    <div>
      <div className="track-counter">
        <Typography variant="h6">Total Tracks: {songs.length}</Typography>
        <Button variant="contained" color="secondary" onClick={() => setFilters({})}>
          Reset Filters
        </Button>
      </div>
      <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1800 }} aria-label="simple table" style={{ tableLayout: 'fixed', width: 'auto' }}>
          <TableHead>
            <TableRow>
              {attributeList.map(attr => (
                <TableCell key={attr} style={{ backgroundColor: '#000', color: '#fff', whiteSpace: 'nowrap', minWidth: 150 }}>
                  {attr}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {attributeList.map(attribute => (
                <TableCell key={attribute} style={{ verticalAlign: 'top' }}>
                  <strong>{attribute}:</strong>
                  <div className="unique-values-container">
                    {uniqueValuesWithCounts[attribute] && Object.entries(uniqueValuesWithCounts[attribute]).map(([value, count], index) => (
                      <div key={index} className={`unique-value ${filters[attribute] && filters[attribute].includes(value) ? 'selected' : ''}`} onClick={() => handleValueClick(attribute, value)}>
                        {value} <span>({count})</span>
                      </div>
                    ))}
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
