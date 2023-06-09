import { SingtelGrid, ColumnDef, RowData } from 'grid-lib';

function App() {
  
  const columnDefs: ColumnDef[] = [
    { headerName: 'Name', property: 'name', width: 150, isSort: true },
    { headerName: 'Age', property: 'age', width: 100, isSort: true },
    { headerName: 'City', property: 'city', width: 200, isSort: true },
    { headerName: 'Address', property: 'address', width: 200, isSort: true },
    { headerName: 'Income', property: 'income', width: 150, align: 'rightAligned', isSort: false },
  ];

  const rowData: RowData[] = [
    { name: 'A John Doe', age: 25, city: 'New York', address: 'Sample address 12345',  income: 50000 },
    { name: 'C Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address 12345', income: 70000 },
    { name: 'B Mike Johnson', age: 35, city: 'London', address: 'Sample address 12345', income: 60000 },
    { name: 'E John Doe', age: 25, city: 'New York', address: 'Sample address 12345',  income: 50000 },
    { name: 'G Jane Smith', age: 30, city: 'San Francisco', address: 'Sample address 12345', income: 70000 },
    { name: 'P Mike Johnson', age: 35, city: 'London', address: 'Sample address 12345', income: 60000 },
  ];



  return (
    <>
      <div>
        <SingtelGrid  columnDefs={columnDefs}
        rowData={rowData}
        showHeader= {true}
        rowSelection= {'multiple'} />;
      </div>

    </>
  )
}

export default App
