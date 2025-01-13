import React, { useState } from "react";
import "./InputNumber.css"; // تأكد من إضافة ملف CSS الذي يحتوي على التصميم

const InputNumber = ({ min, max, value, onChange }) => {
  const increment = () => {
    if (value >= max) return;
    onChange(value + 1);
  };

  const decrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  return (
    <div className="input-number">
      <div className="display-title-container">
        <span>عدد النسخ</span>
      </div>

      <div className="control-container">
        <button type="button" onClick={increment} disabled={value >= max}>
          +
        </button>
        <div className="number-display">{value}</div>
        <button type="button" onClick={decrement} disabled={value <= min}>
          −
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
