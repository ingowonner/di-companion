import React, { useState, useRef, useCallback, useEffect } from 'react';
import useSearchPatterns from './useSearchPatterns';
import { Pattern } from '@/types/strapi';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';

interface UseSearchReturn {
  searchContainerRef: React.RefObject<HTMLDivElement>;
  searchResults: Pattern[] | null;
  searchLoading: boolean;
  searchError: string | null;
  isSearching: boolean;
  handleSearch: (query: string) => void;
  SearchComponent: React.FC;
  currentQuery: string;
}

export default function useSearch(): UseSearchReturn {
  const {
    searchPatterns,
    searchResults,
    loading: searchLoading,
    error: searchError,
    clearResults,
  } = useSearchPatterns();
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const lastSearchQueryRef = useRef<string>('');

  useEffect(() => {
    // Set searching state based on search results
    setIsSearching(searchResults !== null && searchResults.length > 0);
  }, [searchResults]);

  // Memoize the search handler to prevent recreating it on each render
  const handleSearch = useCallback(
    (query: string) => {
      // Update the current query state
      setCurrentQuery(query);

      // Only search if the query has changed
      if (query.trim() === lastSearchQueryRef.current) {
        return;
      }

      lastSearchQueryRef.current = query.trim();

      if (query.trim() === '') {
        clearResults();
        return;
      }

      searchPatterns(query);
    },
    [clearResults, searchPatterns],
  );

  // Create a component that renders the search UI
  const SearchComponent = useCallback(() => {
    return (
      <div ref={searchContainerRef} style={{ position: 'relative' }}>
        <SearchBar
          onSearch={handleSearch}
          loading={searchLoading}
          forceExpanded={isSearching || currentQuery.length > 0}
          initialQuery={currentQuery}
        />
        {isSearching && (
          <SearchResults
            results={searchResults}
            loading={searchLoading}
            error={searchError}
            anchorEl={searchContainerRef.current}
          />
        )}
      </div>
    );
  }, [handleSearch, isSearching, searchError, searchLoading, searchResults, currentQuery]);

  return {
    searchContainerRef,
    searchResults,
    searchLoading,
    searchError,
    isSearching,
    handleSearch,
    SearchComponent,
    currentQuery,
  };
}
