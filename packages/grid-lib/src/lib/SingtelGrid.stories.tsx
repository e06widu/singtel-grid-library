import { Meta, StoryObj } from '@storybook/react';
import SingtelGrid from './SingtelGrid';
import { ColumnDef, RowData } from './models';

const meta: Meta<typeof SingtelGrid> = {
  title: 'Design System/SingtelGrid',
  component: SingtelGrid,
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

// const columnDefs: ColumnDef[] = [
//   { headerName: 'Name',  width: 150, property: 'name', isSort: true },
//   { headerName: 'Age', width: 80,property: 'age', isSort: true },
//   { headerName: 'City', width: 150, property: 'city', isSort: true }
// ];

// const rowData: RowData[] = [
//   { name: 'A John Doe', age: 25, city: 'New York' },
//   { name: 'C Jane Smith', age: 30, city: 'San Francisco' },
//   { name: 'B Mike Johnson', age: 35, city: 'London' },
//   { name: 'E John Doe', age: 25, city: 'New York' },
//   { name: 'G Jane Smith', age: 30, city: 'San Francisco' },
//   { name: 'P Mike Johnson', age: 35, city: 'London' },
// ];



export const Primary: StoryObj<typeof SingtelGrid> = {
  args: {
    columnDefs: columnDefs,
    rowData: rowData,
    showHeader: true,
    rowSelection: null,
    mobileTitle: "Contract Details"
  },
};

