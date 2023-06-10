import React from 'react';
import './SingtelGrid.css';

interface SingtelCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SingtelCheckBox: React.FC<SingtelCheckBoxProps> = ({ checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className='singtel-checkbox' onClick={handleChange}>
      <div
        className={`singtel-checkbox-icon ${checked ? 'checked' : 'not-checked'}`}
        role="checkbox"
        aria-checked={checked}
      />
    </div>
  );
};

export default SingtelCheckBox;
