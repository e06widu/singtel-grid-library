export interface RowData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface ColumnDef {
    headerName: string;
    property: string;
    width?: number;
    align?: 'rightAligned' | 'leftAligned';
    isSort?: boolean;
    isDisplay?: boolean; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellRenderer?: (value: any, row: RowData) => React.ReactNode;
}

export interface SingtelGridProps {
    columnDefs: ColumnDef[];
    rowData: RowData[];
    mobileTitle: string;
    showHeader?: boolean;
    rowSelection?: 'single' | 'multiple' | null;
    getUniqRowId?: (data: RowData) => string;
    getSelectedRows?: (selectedRows: RowData[]) => void;
}