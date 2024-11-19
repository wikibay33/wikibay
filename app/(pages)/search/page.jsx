// app/search/page.js
import React, { Suspense } from 'react';
import SearchResults from './SearchResultsClient';

export default function SearchPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <Suspense fallback={<p>Loading search results...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
