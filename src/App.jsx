import React, { useContext } from 'react';
import AppClass from './part-a-class/AppClass';
import AppHooks from './part-b-hooks/AppHooks';
import { ThemeProvider, ThemeContext } from './part-b-hooks/ThemeContext';
import './App.css';

//thanh điều hướng trên cùng chứa nút bật/tắt sáng/tối
function GlobalHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="global-header">
      <h1>SỔ CHI TIÊU CÁ NHÂN</h1>
      <button onClick={toggleTheme} className="btn-theme">
        {theme === 'light' ? 'Tối ' : 'Sáng'}
      </button>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GlobalHeader />
      <div className="app-container">
        <AppClass />
        <AppHooks />
      </div>
    </ThemeProvider>
  );
}