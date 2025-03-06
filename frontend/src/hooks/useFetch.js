import { useState, useEffect } from 'react';

const useFetch = (endpoint, id, cacheKey, cacheDuration = 180000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilize session storage to save data for 3 mins
  useEffect(() => {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsedCache = JSON.parse(cached);
      // If the current date is less than the cache duration, then the cache is valid. No calls are made
      if (new Date().getTime() - parsedCache.timestamp < cacheDuration) {
        setData(parsedCache.data);
        setLoading(false);
        //console.log("Cache is valid."); // debug
        return;
      } //console.log("Cache not valid, re-calling api...") // debug
    }

    const fetchData = async () => {
      try {
        const url = `http://localhost:5001${endpoint.replace(':id', id)}`; // id is optional, used for metadata
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
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
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id, cacheKey, cacheDuration]);

  return { data, loading, error };
};

export default useFetch;
