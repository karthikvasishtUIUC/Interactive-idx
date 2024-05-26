import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import songs from '../Songs4.json';  // Ensure this path correctly points to your JSON file
import '../styles/App.css';

const attributeList = [
  "#", "TRACK", "ARTIST", "ALBUM", "TIME", "YEAR", "GENRE", 
  "AQUATIC REFERENCE", "WEATHER/CLIMATE", "RITUAL/ACT", "VESSEL/INFRASTRUCTURE", "CONTEXT"
];

const MusicTable = ({ filters, setFilters }) => {

    const handleFilterChange = (attribute, value) => {
        const currentValues = filters[attribute] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        const newFilters = { ...filters, [attribute]: newValues };
        if (newValues.length === 0) {
            delete newFilters[attribute];
        }
        setFilters(newFilters);
    };

    const isFiltered = (attribute, value) => {
        return filters[attribute]?.includes(value);
    };

    const getFilteredSongs = useMemo(() => {
        return Object.keys(filters).length === 0
            ? songs['Song List v2 ']
            : songs['Song List v2 '].filter(song =>
                Object.keys(filters).every(attribute =>
                    filters[attribute].length === 0 || filters[attribute].includes(song[attribute])
                )
            );
    }, [filters]);

    const headerCounts = useMemo(() => {
        return attributeList.map(attr => {
            const allValues = getFilteredSongs.map(song => song[attr]);
            const uniqueValues = [...new Set(allValues)];
            return { unique: uniqueValues.length, total: allValues.length };
        });
    }, [getFilteredSongs]);

    return (
        <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 1800 }} aria-label="simple table" style={{ tableLayout: 'fixed', width: 'auto' }}>
                <TableHead>
                    <TableRow>
                        {attributeList.map((attr, index) => (
                            <TableCell key={attr} style={{ backgroundColor: '#000', color: '#fff', whiteSpace: 'nowrap', minWidth: 150 }}>
                                <div style={{ fontWeight: 'bold' }}>{attr}</div>
                                <div style={{ fontSize: 'smaller' }}>(Unique: {headerCounts[index].unique}, Total: {headerCounts[index].total})</div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getFilteredSongs.map((song, index) => (
                        <TableRow key={index} className="table-row">
                            {attributeList.map(attr => (
                                <TableCell
                                    key={attr}
                                    onClick={() => handleFilterChange(attr, song[attr])}
                                    className={`table-cell ${isFiltered(attr, song[attr]) ? 'filtered' : ''}`}
                                >
                                    {song[attr] || 'N/A'}
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
