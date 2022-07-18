import { useState } from 'react';

export default (apiFunc: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      console.log('error:', response);
      return setError(true);
    }

    setError(false);
    setData(response.data);
    return response.data;
  };

  return { data, error, loading, request };
};
