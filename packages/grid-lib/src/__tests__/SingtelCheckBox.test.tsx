import { render, fireEvent } from '@testing-library/react';
import SingtelCheckBox from '../lib/SingtelCheckBox';
import '@testing-library/jest-dom/extend-expect';

describe('SingtelCheckBox', () => {
  it('renders correctly when checked is true', () => {
    const { getByRole } = render(<SingtelCheckBox checked={true} onChange={() => {console.log('clicked')}} />);
    const checkBoxIcon = getByRole('checkbox');

    expect(checkBoxIcon).toHaveClass('checked');
    expect(checkBoxIcon).toHaveAttribute('aria-checked', 'true');
  });

  it('renders correctly when checked is false', () => {
    const { getByRole } = render(<SingtelCheckBox checked={false} onChange={() => {console.log('clicked')}} />);
    const checkBoxIcon = getByRole('checkbox');

    expect(checkBoxIcon).toHaveClass('not-checked');
    expect(checkBoxIcon).toHaveAttribute('aria-checked', 'false');
  });

  it('calls the onChange callback with the updated checked value when clicked', () => {
    let isChecked = false;
    const onChangeMock = jest.fn((checked) => {
      isChecked = checked;
    });

    const { getByRole } = render(<SingtelCheckBox checked={isChecked} onChange={onChangeMock} />);
    const checkBoxDiv = getByRole('checkbox');

    fireEvent.click(checkBoxDiv);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(true);
    expect(isChecked).toBe(true);
  });
});