import React from 'react';
import './SingtelGrid.css';

interface SingtelRadioButtonProps {
  checked: boolean;
  onChange: () => void;
}

const SingtelRadioButton: React.FC<SingtelRadioButtonProps> = ({ checked, onChange }) => {
  return (
    <div className="singtel-radio-button" onClick={onChange}>
      <div
        className={`singtel-radio-icon ${checked ? 'checked' : 'not-checked'}`}
        role="checkbox"
        aria-checked={checked}
      />
    </div>
  );
};

export default SingtelRadioButton;

