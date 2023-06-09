import { Meta, StoryObj } from '@storybook/react';
import SingtelGrid, { ColumnDef, RowData } from './SingtelGrid';

const meta: Meta<typeof SingtelGrid> = {
  title: 'Design System/SingtelGrid',
  component: SingtelGrid,
};
export default meta;

const columnDefs: ColumnDef[] = [
  { headerName: 'Name', property: 'name', width: 150, isSort: true },
  { headerName: 'Age', property: 'age', width: 100, isSort: true },
  { headerName: 'City', property: 'city', width: 200, isSort: true },
  { headerName: 'Address', property: 'address', width: 300, isSort: true },
  { headerName: 'Income', property: 'income', width: 120, align: 'rightAligned', isSort: true },
];

const rowData: RowData[] = [
  { name: 'A John Doe', age: 25, city: 'New York', address: 'Sample address', income: 350000 },
  { name: 'C Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address dfghsdf drthwtyetr', income: 70000 },
  { name: 'B Mike Johnson', age: 35, city: 'London', address: 'Sample address', income: 60000 },
  { name: 'E John Doe', age: 25, city: 'New York', address: 'Sample address', income: 50000 },
  { name: 'G Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address', income: 70000 },
  { name: 'P Mike Johnson', age: 35, city: 'London', address: 'Sample address', income: 60000 },
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
    rowSelection: "multiple",
    mobileTitle: "Contract details"
  },
};

