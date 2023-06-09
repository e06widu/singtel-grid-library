export interface RowData {
    [key: string]: any;
}

export interface ColumnDef {
    headerName: string;
    property: string;
    width?: number;
    align?: 'rightAligned' | 'leftAligned';
    isSort?: boolean;
    isDisplay?: boolean; 
    cellRenderer?: (value: any, row: RowData) => React.ReactNode;
}

export interface SingtelGridProps {
    columnDefs: ColumnDef[];
    rowData: RowData[];
    mobileTitle: string;
    showHeader?: boolean;
    getUniqRowId?: (data: RowData) => string;
    rowSelection?: 'single' | 'multiple' | null;
}