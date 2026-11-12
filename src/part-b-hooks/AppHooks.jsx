import React, { useState, useRef, useEffect } from 'react';
import { useFetch, useClock, useDebounce } from './hooks';

const API_URL = 'https://6ad0418603feaa52b21f2c10.mockapi.io/expenses';

export default function AppHooks() {
  const time = useClock(); 
  const { data: expenses, setData: setExpenses, loading, error } = useFetch(API_URL);
  
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [filterCat, setFilterCat] = useState('Tất cả');
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500); 

  const descInputRef = useRef(null);

  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const dateString = `${days[time.getDay()]}, ngày ${time.getDate()} tháng ${time.getMonth() + 1} năm ${time.getFullYear()}`;

  useEffect(() => {
    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    document.title = `(Hooks) Tổng chi: ${total.toLocaleString()}đ`;
  }, [expenses]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!desc.trim() || amount <= 0) return alert('Dữ liệu không hợp lệ!');
    
    const newExp = { desc, amount: Number(amount), category, date: new Date().toISOString().split('T')[0] };
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp)
      });
      const savedExp = await res.json();
      setExpenses([...expenses, savedExp]);
      
      setDesc(''); setAmount('');
      descInputRef.current.focus(); 
    } catch (err) {
      alert('Lỗi khi thêm!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const filtered = expenses.filter(e => {
    const matchCat = filterCat === 'Tất cả' || e.category === filterCat;
    const matchSearch = e.desc.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const stats = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="header">
        <h2>PHẦN B - HOOKS & MOCKAPI</h2>
      </div>

      <div className="clock-box">
        <h3>{time.toLocaleTimeString('vi-VN')}</h3>
        <p>{dateString}</p>
      </div>

      <form onSubmit={handleAdd} className="form-box">
        <input ref={descInputRef} placeholder="Nội dung chi..." value={desc} onChange={e => setDesc(e.target.value)} />
        <input type="number" placeholder="Số tiền..." value={amount} onChange={e => setAmount(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Ăn uống</option><option>Đi lại</option><option>Học tập</option><option>Giải trí</option>
        </select>
        <button type="submit">Thêm</button>
      </form>

      <input className="search-box" placeholder="🔍 Tìm kiếm nội dung..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

      <div className="filters">
        {['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'].map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} className={filterCat === cat ? 'active' : ''}>{cat}</button>
        ))}
      </div>

      {loading && <p>...Đang tải dữ liệu...</p>}
      {error && <p>Lỗi: {error}</p>}

      <ul className="expense-list">
        {filtered.map(exp => (
          <li key={exp.id}>
            <span>{exp.date} - {exp.desc} ({exp.category})</span>
            <strong>{Number(exp.amount).toLocaleString()}đ</strong>
            <button onClick={() => handleDelete(exp.id)}>Xóa</button>
          </li>
        ))}
      </ul>

      <div className="stats-box">
        <h4>Thống kê theo loại:</h4>
        {Object.entries(stats).map(([cat, val]) => (
          <div key={cat}>{cat}: {val.toLocaleString()}đ</div>
        ))}
      </div>
    </div>
  );
}