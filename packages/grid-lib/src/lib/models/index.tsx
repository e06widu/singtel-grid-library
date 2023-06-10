/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Interface representing the data for a single row in the grid.
 */
export interface RowData {
    /**
     * A key-value pair where the key is a string and the value can be of any type.
     * This allows flexibility in defining the properties of the row data object.
     */
    [key: string]: any;
  }

/**
 * Definition for a column in the grid.
 */
export interface ColumnDef {
    /**
     * The header name of the column.
     */
    headerName: string;
  
    /**
     * The property name of the column in the `RowData` object.
     */
    property: string;
  
    /**
     * The width of the column (optional).
     */
    width?: number;
  
    /**
     * The alignment of the column text.
     * - 'rightAligned': Aligns the text to the right.
     * - 'leftAligned': Aligns the text to the left (default).
     */
    align?: 'rightAligned' | 'leftAligned';
  
    /**
     * Specifies whether the column is sortable.
     */
    isSort?: boolean;
  
    /**
     * Specifies whether the column should be displayed.
     */
    isDisplay?: boolean;
  
    /**
     * A custom cell renderer function that takes the cell value and the row data as arguments
     * and returns the rendered content as a React node (optional).
     * - `value`: The value of the cell.
     * - `row`: The corresponding row data object.
     */
    cellRenderer?: (value: any, row: RowData) => React.ReactNode;
  }
  
/**
 * Props for the SingtelGrid component.
 */
export interface SingtelGridProps {
    /**
     * An array of column definitions for the grid.
     */
    columnDefs: ColumnDef[];
  
    /**
     * An array of row data for the grid.
     */
    rowData: RowData[];
  
    /**
     * The title to be displayed on mobile view.
     */
    mobileTitle: string;
  
    /**
     * Determines whether to show the grid header.
     */
    showHeader?: boolean;
  
    /**
     * Specifies the row selection mode.
     * - 'single': Allows selecting a single row.
     * - 'multiple': Allows selecting multiple rows.
     * - null: Disables row selection.
     */
    rowSelection?: 'single' | 'multiple' | null;
  
    /**
     * A function to generate a unique identifier for each row of data.
     * The function receives a `RowData` object and should return a string identifier.
     */
    getUniqRowId?: (data: RowData) => string;
  
    /**
     * A callback function that is called when the selected rows change.
     * It receives an array of selected `RowData` objects.
     */
    getSelectedRows?: (selectedRows: RowData[]) => void;
  }
  