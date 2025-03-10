import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Fade, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Pattern } from '@/types/strapi';
import { categoryColors } from '@/utils/constants';

interface SearchResultsProps {
  results: Pattern[] | null;
  loading: boolean;
  error: string | null;
  anchorEl?: HTMLElement | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, error, anchorEl }) => {
  const navigate = useNavigate();

  if (loading) {
    return null; // Loading is handled by the SearchBar component
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: anchorEl ? 50 : 0,
          right: 0,
          zIndex: 1300,
          width: 300,
          p: 2,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  const handlePatternClick = (pattern: Pattern) => {
    navigate(`/explore/${pattern.documentId}`);
  };

  return (
    <Fade in={Boolean(results && results.length > 0)}>
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: anchorEl ? 50 : 0,
          right: 0,
          zIndex: 1300,
          width: 320,
          maxHeight: 400,
          overflowY: 'auto',
          borderRadius: 2,
        }}
      >
        <List sx={{ py: 1 }}>
          {results.map((pattern) => (
            <ListItem
              button
              key={pattern.documentId}
              onClick={() => handlePatternClick(pattern)}
              sx={{
                py: 1.5,
                px: 2,
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'visible',
                pl: 3,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  transform: 'translateX(4px)',
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  backgroundColor: categoryColors[pattern.category] || '#ccc',
                  borderTopLeftRadius: pattern.documentId === results[0].documentId ? 4 : 0,
                  borderBottomLeftRadius:
                    pattern.documentId === results[results.length - 1].documentId ? 4 : 0,
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    fontWeight="500"
                    sx={{
                      pr: 4,
                      lineHeight: 1.3,
                    }}
                  >
                    {pattern.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {pattern.description?.substring(0, 60)}
                    {pattern.description?.length > 60 ? '...' : ''}
                  </Typography>
                }
              />
              <Chip
                size="small"
                label={pattern.patternId}
                variant="outlined"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Fade>
  );
};

export default SearchResults;
