import React, { Component } from 'react';

//component đồng hồ
class Clock extends Component {
  state = { time: new Date() };
  timerId = null;

  componentDidMount() {
    this.timerId = setInterval(() => this.setState({ time: new Date() }), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  
  render() {
    const { time } = this.state;
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dateString = `${days[time.getDay()]}, ngày ${time.getDate()} tháng ${time.getMonth() + 1} năm ${time.getFullYear()}`;

    return (
      <div className="clock-box">
        <h3>{time.toLocaleTimeString('vi-VN')}</h3>
        <p>{dateString}</p>
      </div>
    );
  }
}

//component form thêm khoản chi
class ExpenseForm extends Component {
  state = { desc: '', amount: '', category: 'Ăn uống', date: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { desc, amount, category, date } = this.state;
    if (!desc.trim() || amount <= 0 || !date) {
      alert('Vui lòng nhập đầy đủ thông tin hợp lệ!');
      return;
    }
    this.props.onAdd({ id: Date.now(), desc, amount: Number(amount), category, date });
    this.setState({ desc: '', amount: '', category: 'Ăn uống', date: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-box">
        <input placeholder="Nội dung chi..." value={this.state.desc} onChange={e => this.setState({ desc: e.target.value })} />
        <input type="number" placeholder="Số tiền..." value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })} />
        <select value={this.state.category} onChange={e => this.setState({ category: e.target.value })}>
          <option>Ăn uống</option><option>Đi lại</option><option>Học tập</option><option>Giải trí</option>
        </select>
        <input type="date" value={this.state.date} onChange={e => this.setState({ date: e.target.value })} />
        <button type="submit">Thêm khoản chi</button>
      </form>
    );
  }
}

//component app chính
export default class AppClass extends Component {
  state = {
    expenses: [
      { id: 1, desc: 'Ăn trưa', amount: 35000, category: 'Ăn uống', date: '2026-10-20' },
      { id: 2, desc: 'Đổ xăng', amount: 50000, category: 'Đi lại', date: '2026-10-21' }
    ],
    filterCat: 'Tất cả'
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      const total = this.state.expenses.reduce((sum, item) => sum + item.amount, 0);
      document.title = `Tổng chi: ${total.toLocaleString()}đ`;
    }
  }

  handleAdd = (newExp) => this.setState({ expenses: [...this.state.expenses, newExp] });
  
  handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa?')) {
      this.setState({ expenses: this.state.expenses.filter(e => e.id !== id) });
    }
  };

  render() {
    const { expenses, filterCat } = this.state;
    const filtered = filterCat === 'Tất cả' ? expenses : expenses.filter(e => e.category === filterCat);
    const totalAmount = filtered.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div className="container">
        <div className="header">
          <h2>PHẦN A - CLASS COMPONENT</h2>
        </div>
        
        <Clock />
        
        <ExpenseForm onAdd={this.handleAdd} />

        <div className="filters">
          {['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'].map(cat => (
            <button key={cat} onClick={() => this.setState({ filterCat: cat })} className={filterCat === cat ? 'active' : ''}>
              {cat}
            </button>
          ))}
        </div>

        <ul className="expense-list">
          {filtered.map(exp => (
            <li key={exp.id}>
              <span>{exp.date} - {exp.desc} ({exp.category})</span>
              <strong>{exp.amount.toLocaleString()}đ</strong>
              <button onClick={() => this.handleDelete(exp.id)}>Xóa</button>
            </li>
          ))}
        </ul>
        <h3 className="total">Tổng tiền: {totalAmount.toLocaleString()}đ</h3>
      </div>
    );
  }
}