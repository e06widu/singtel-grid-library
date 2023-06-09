import { SingtelGrid, ColumnDef, RowData } from 'grid-lib';

import '../../../node_modules/grid-lib/dist/style.css';

import './my-theme.css'

function App() {
  
  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 150, isSort: true },
    { headerName: 'Age', property: 'age', width: 100, isSort: true },
    {
      headerName: 'Start Date', property: 'startDate', width: 170,
      cellRenderer: (data: string) => { 
        const date = new Date(data);
        const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return <>{`${months[date.getMonth()]} ${date.getFullYear()}`}</> 
      }, isSort: true
    },
    { headerName: 'City', property: 'city', width: 200, isSort: true },
    { headerName: 'Address', property: 'address', width: 300, isSort: true },
    {
      headerName: 'Income', property: 'income', width: 120, align: 'rightAligned', isSort: true,
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


  return (
    <>
      <div className='my-theme'>
      <SingtelGrid
          columnDefs={columnDefs}
          rowData={rowData}
          showHeader={true}
          rowSelection={'multiple'} 
          mobileTitle={'Contract'} />;
      </div>

    </>
  )
}

export default App
