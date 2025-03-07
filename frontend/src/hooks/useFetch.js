import { useState, useEffect } from 'react';

// Main data fetching function
const useFetch = (endpoint, id, cacheKey, cacheDuration = 180000) => {
  // Use state for data, loading status, and errors to send to components
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilize session storage to save data for 3 mins
  useEffect(() => {
    // Check session storage for already cached data
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsedCache = JSON.parse(cached);
      // If the current date is less than the cache duration, then the cache is valid. No calls are made
      if (new Date().getTime() - parsedCache.timestamp < cacheDuration) {
        setData(parsedCache.data);
        setLoading(false);
        return;
      }
    }
    // Fetch data from API and update state and cache
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}${endpoint.replace(':id', id)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        // Update state with fresh data
        const result = await response.json();
        setData(result);
        // Set the fetched data into session storage with current time
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result, timestamp: new Date().getTime() })
        );
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        // Turn off loading when done
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id, cacheKey, cacheDuration]);

  // Return state values for components
  return { data, loading, error };
};

export default useFetch;
