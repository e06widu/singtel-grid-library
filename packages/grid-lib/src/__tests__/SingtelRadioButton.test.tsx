import { render, fireEvent } from '@testing-library/react';
import SingtelRadioButton from '../lib/SingtelRadioButton';
import '@testing-library/jest-dom/extend-expect';



describe('SingtelRadioButton', () => {
  it('renders correctly when checked is true', () => {
    const { getByRole } = render(<SingtelRadioButton checked={true} onChange={() => {}} />);
    const radioIcon = getByRole('checkbox');

    expect(radioIcon).toHaveClass('checked');
    expect(radioIcon).toHaveAttribute('aria-checked', 'true');
  });

  it('renders correctly when checked is false', () => {
    const { getByRole } = render(<SingtelRadioButton checked={false} onChange={() => {}} />);
    const radioIcon = getByRole('checkbox');

    expect(radioIcon).toHaveClass('not-checked');
    expect(radioIcon).toHaveAttribute('aria-checked', 'false');
  });

  it('calls the onChange callback when clicked', () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(<SingtelRadioButton checked={false} onChange={onChangeMock} />);
    const radioDiv = getByRole('checkbox');

    fireEvent.click(radioDiv);

    expect(onChangeMock).toHaveBeenCalled();
  });
});