// app/search/SearchResultsClient.js
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/softwares/search?q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error('Error fetching search results');
          const data = await res.json();
          setResults(data);
          setNoResults(data.length === 0);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setNoResults(true);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : noResults ? (
        <p>There are no softwares matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map((software) => (
            <div key={software._id} className="p-4 border rounded-lg flex flex-col md:flex-row gap-8">
              <Image src={software.logo} width={100} height={100} alt={software.name} />
              <div>
                <h2 className="text-xl font-semibold">{software.name}</h2>
                <p>{software.description}</p>
                <Link href={`/software/${software._id}`}>
                  <span className="text-blue-500 hover:underline mt-2">Read More</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
