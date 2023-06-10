import { fireEvent, render, screen } from '@testing-library/react';
import SingtelGrid from '../lib/SingtelGrid';
import '@testing-library/jest-dom/extend-expect';
import { ColumnDef, RowData } from '../lib/models';

describe('SingtelGrid', () => {
  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 200 },
    { headerName: 'Age', property: 'age', width: 100 },
  ];

  const rowData: RowData[] = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
  ];

  it('renders the grid with header and rows', () => {
    render(<SingtelGrid mobileTitle={'Profile details'} columnDefs={columnDefs} rowData={rowData} />);

    // Header
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();

    // Rows
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders the grid header with column names', () => {
    const { getByText } = render(
      <SingtelGrid columnDefs={columnDefs} rowData={rowData} mobileTitle="Mobile Title" />
    );

    const nameHeader = getByText('Name');
    const ageHeader = getByText('Age');

    expect(nameHeader).toBeInTheDocument();
    expect(ageHeader).toBeInTheDocument();
  });

  it('applies the provided column widths', () => {
    const { getByText } = render(
      <SingtelGrid columnDefs={columnDefs} rowData={rowData} mobileTitle="Mobile Title" />
    );

    const nameCell = getByText('John Doe').parentElement;
    const ageCell = getByText('30').parentElement;

    expect(nameCell).toHaveStyle('width: 200px');
    expect(ageCell).toHaveStyle('width: 100px');
  });

  it('handles row selection', () => {
    render(
      <SingtelGrid
        mobileTitle={'Profile details'}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      />
    );

    const checkbox1 = screen.getAllByRole('checkbox')[1];
    const checkbox2 = screen.getAllByRole('checkbox')[2];

    // Click checkboxes to select rows
    expect(checkbox1.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');
    expect(checkbox2.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');

    // Select first row
    fireEvent.click(checkbox1);
    expect(checkbox1.getAttribute('class')).toEqual('singtel-checkbox-icon checked');
    expect(checkbox2.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');

    // Select second row
    fireEvent.click(checkbox2);
    expect(checkbox1.getAttribute('class')).toEqual('singtel-checkbox-icon checked');
    expect(checkbox2.getAttribute('class')).toEqual('singtel-checkbox-icon checked');

    // Deselect first row
    fireEvent.click(checkbox1);
    expect(checkbox1.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');
    expect(checkbox2.getAttribute('class')).toEqual('singtel-checkbox-icon checked');

    // Deselect second row
    fireEvent.click(checkbox2);
    expect(checkbox1.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');
    expect(checkbox2.getAttribute('class')).toEqual('singtel-checkbox-icon not-checked');
  });

  it('handles single row selection', () => {

    render(
      <SingtelGrid
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="single"
        mobileTitle="Sample Data"
      />
    );

    const radioButton1 = screen.getAllByRole('checkbox')[0];
    const radioButton2 = screen.getAllByRole('checkbox')[1];

    // Click radio buttons to select rows
    expect(radioButton1.getAttribute('class')).toEqual('singtel-radio-icon not-checked');
    expect(radioButton2.getAttribute('class')).toEqual('singtel-radio-icon not-checked');

    // Select first row
    fireEvent.click(radioButton1.parentElement as HTMLElement);
    expect(radioButton1.getAttribute('class')).toEqual('singtel-radio-icon checked');
    expect(radioButton2.getAttribute('class')).toEqual('singtel-radio-icon not-checked');

    // Select second row
    fireEvent.click(radioButton2.parentElement as HTMLElement);
    expect(radioButton1.getAttribute('class')).toEqual('singtel-radio-icon not-checked');
    expect(radioButton2.getAttribute('class')).toEqual('singtel-radio-icon checked');
  });
});

