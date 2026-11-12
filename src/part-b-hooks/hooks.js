import { useState, useEffect } from 'react';

// Custom hook lấy, thêm, xóa dữ liệu qua mockapi[cite: 15]
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái đang tải[cite: 15]
  const [error, setError] = useState(null);     // Trạng thái lỗi[cite: 15]

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error('Lỗi tải dữ liệu');
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [url]);

  return { data, setData, loading, error };
};

// Yêu cầu nâng cao: Custom hook useClock[cite: 15]
export const useClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
};

// Yêu cầu nâng cao: Ô tìm kiếm có độ trễ (debounce)[cite: 15]
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};