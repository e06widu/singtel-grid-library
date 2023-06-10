import { Meta, StoryObj } from '@storybook/react';
import SingtelGrid from '../SingtelGrid';
import { ColumnDef, RowData, SingtelGridProps } from '../models';

import './grid-theme.css'

/**
 * Primary UI component for SingtelGrid
 */
const meta: Meta<typeof SingtelGrid> = {
  title: 'SingtelGrid',
  component: SingtelGrid,
  tags: ['autodocs'],
};
export default meta;

const columnDefs: ColumnDef[] = [
  { headerName: 'Name', property: 'name', width: 150, isSort: true },
  { headerName: 'Age', property: 'age', width: 100, isSort: true, isDisplay: false },
  {
    headerName: 'Date', property: 'startDate', width: 170,
    cellRenderer: (data: string) => {
      const date = new Date(data);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return <>{`${months[date.getMonth()]} ${date.getFullYear()}`}</>
    }, isSort: true
  },
  { headerName: 'City', property: 'city', width: 200, isSort: true, isDisplay: false },
  { headerName: 'Address', property: 'address', width: 300, isSort: true, isDisplay: false },
  {
    headerName: 'Income', property: 'income', width: 150, align: 'rightAligned', isSort: true,
    cellRenderer: (data: string) => { return <>{`$${data}`}</> }
  },
];

const rowData: RowData[] = [
  { name: 'A John Doe', age: 25, startDate: '2023-08-09', city: 'New York', address: 'Sample address', income: 350000 },
  { name: 'C Jane Smith', age: 30, startDate: '2023-06-09', city: 'San Francisco', address: 'Sample address', income: 70000 },
  { name: 'B Mike Johnson', age: 35, startDate: '2022-12-25', city: 'London', address: 'Sample address', income: 60000 },
  { name: 'E John Doe', age: 25, startDate: '2023-07-01', city: 'New York', address: 'Sample address', income: 5000000 },
  { name: 'G Jane Smith', age: 30, startDate: '2023-04-20', city: 'San Francisco', address: 'Sample address', income: 70000 },
  { name: 'P Mike Johnson', age: 35, startDate: '2023-01-31', city: 'London', address: 'Sample address', income: 60000 },
];

export const Primary: StoryObj<typeof SingtelGrid> = {
  args: {
    columnDefs: columnDefs,
    rowData: rowData,
    showHeader: true,
    rowSelection: null,
    mobileTitle: "Contract Details",
    getSelectedRows: (selectedRows) => {
      console.log('Selected Rows:', selectedRows);
    }
  },
};

const columnDefsCustomTheme: ColumnDef[] = [
  { headerName: 'Destination', property: 'destination' },
  { headerName: 'Mins', property: 'mins' },
  {
    headerName: 'Rate/Min', property: 'rate', align: 'rightAligned',
    cellRenderer: (data: string) => { return <>{`$${data}`}</> }
  },
];

const rowDataCustomTheme: RowData[] = [
{destination: 'Bangladesh', mins: 240, rate: 0.03},
{destination: 'China', mins: 600, rate: 0.01},
{destination: 'India', mins: 600, rate: 0.07},
{destination: 'Indonesia', mins: 90, rate: 0.13},
{destination: 'Malaysia', mins: 60, rate: 0.02},
];

export const ThreeColumns: StoryObj<typeof SingtelGrid> = {
  args: {
    columnDefs: columnDefsCustomTheme,
    rowData: rowDataCustomTheme,
    showHeader: true,
    rowSelection: null,
    mobileTitle: "Rate Details",
    getSelectedRows: (selectedRows) => {
      console.log('Selected Rows:', selectedRows);
    }
  },
};

// Define the CustomTheme export data
export const CustomTheme: StoryObj<SingtelGridProps> = (args: SingtelGridProps) => (
  <div style={{ height: '400px' }}>
    <div className="singtel-grid-theme">
      <SingtelGrid {...args} />
    </div>
  </div>
);

// Configure the CustomTheme export data with default arguments
CustomTheme.args = {
  columnDefs: columnDefs,
  rowData: rowData,
  showHeader: true,
  rowSelection: null,
  mobileTitle: "Contract Details",
  getSelectedRows: (selectedRows) => {
    console.log('Selected Rows:', selectedRows);
  }
};
