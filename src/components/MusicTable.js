import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import songs from '../Songs4.json';

const attributeList = [
  "#", "TRACK", "ARTIST", "ALBUM", "TIME", "YEAR", "GENRE", 
  "AQUATIC REFERENCE", "WEATHER/CLIMATE", "RITUAL/ACT", "VESSEL/INFRASTRUCTURE", "CONTEXT"
];

const MusicTable = ({ filters, setFilters }) => {
    // We use useState to keep track of displayed values for YEAR and GENRE
    const [displayed, setDisplayed] = useState({ YEAR: [], GENRE: [] });

    const handleFilterChange = (attribute, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [attribute]: (prevFilters[attribute] || []).includes(value) ?
                prevFilters[attribute].filter(v => v !== value) :
                [...(prevFilters[attribute] || []), value]
        }));
    };

    const getFilteredSongs = useMemo(() => {
        return songs['Song List v2 '].filter(song =>
            Object.entries(filters).every(([attr, values]) =>
                values.length === 0 || values.includes(song[attr])
            )
        );
    }, [filters]);

    // Function to compute counts
    const computeCounts = useMemo(() => {
        const yearCounts = {};
        const genreCounts = {};
        songs['Song List v2 '].forEach(song => {
            yearCounts[song.YEAR] = (yearCounts[song.YEAR] || 0) + 1;
            genreCounts[song.GENRE] = (genreCounts[song.GENRE] || 0) + 1;
        });
        return { yearCounts, genreCounts };
    }, []);

    // Initialize display arrays for YEAR and GENRE
    useMemo(() => {
        setDisplayed({
            YEAR: Object.keys(computeCounts.yearCounts).map(year => `${year} (${computeCounts.yearCounts[year]})`),
            GENRE: Object.keys(computeCounts.genreCounts).map(genre => `${genre} (${computeCounts.genreCounts[genre]})`)
        });
    }, [computeCounts]);

    return (
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
                    {getFilteredSongs.map((song, index) => (
                        <TableRow key={index}>
                            {attributeList.map(attr => (
                                <TableCell
                                    key={attr}
                                    onClick={() => handleFilterChange(attr, song[attr])}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        minWidth: 150
                                    }}>
                                    {attr === "YEAR" && index < displayed.YEAR.length ? displayed.YEAR[index] :
                                     attr === "GENRE" && index < displayed.GENRE.length ? displayed.GENRE[index] :
                                     attr !== "YEAR" && attr !== "GENRE" ? (song[attr] || 'N/A') : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MusicTable;
