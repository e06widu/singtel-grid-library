import React, { useEffect, useRef, useState } from 'react';
import './SingtelGrid.css';
import '../fonts/AvenirLTStd.css';
// import sortingUpIcon from '../assets/sortingUp.svg';
// import sortingDownIcon from '../assets/sortingDown.svg';
// import sortingNeutralIcon from '../assets/sortingNeutral.svg';

import SingtelCheckBox from './SingtelCheckBox';
import SingtelRadioButton from './SingtelRadioButton';
import { ColumnDef, RowData, SingtelGridProps } from './models';

const SingtelGrid: React.FC<SingtelGridProps> = ({
  columnDefs,
  rowData,
  mobileTitle,
  showHeader = true,
  rowSelection,
  getSelectedRows,
  getUniqRowId = (data: RowData) => JSON.stringify(data),
}) => {

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState<number>(0);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [updatedColumnDefs, setUpdatedColumnDefs] = useState<ColumnDef[]>([]);

  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isHeaderMultiselect, setIsHeaderMultiselect] = useState<boolean>(false);

  // Hook for handling grid width and mobile view
  useEffect(() => {
    const handleResize = () => {
      if (gridRef.current) {
        setGridWidth(gridRef.current.offsetWidth);
      }
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Hook for updating column widths based on grid width and mobile view
  useEffect(() => {
    const updatedColumnDefs = columnDefs
      .filter((columnDef) => columnDef.isDisplay !== false)
      .map((columnDef) => {
        if (!columnDef.width) {
          const updatedWidth = ((gridWidth - (isMobileView ? 68 : 84)) / columnDefs.length);
          return { ...columnDef, width: updatedWidth };
        }
        return columnDef;
      });
    setUpdatedColumnDefs(updatedColumnDefs);
  }, [columnDefs, gridWidth, isMobileView]);


  /**
   * handling column sorting
   * @param column column
   */
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  /**
   * getting the sort icon based on the current sort column and order
   * @param column column
   * @returns sort icon
   */
  const getSortIcon = (column: string) => {
    if (column === sortColumn) {
      return sortOrder;
    } else {
      return 'neutral';
    }
  };

  /**
   * handling row selection
   * @param rowId uniq row id
   */
  const handleRowSelection = (rowId: string) => {
    if (rowSelection === 'single') {
      setSelectedRows([rowId]);
      getSelectedRows?.([rowData.find((row) => getUniqRowId(row) === rowId)] as RowData[]);
    } else if (rowSelection === 'multiple') {
      const selectedRowSet = new Set(selectedRows);
      if (selectedRowSet.has(rowId)) {
        selectedRowSet.delete(rowId);
      } else {
        selectedRowSet.add(rowId);
      }
      setSelectedRows(Array.from(selectedRowSet));
      getSelectedRows?.(Array.from(selectedRowSet).map((rowId) => rowData.find((row) => getUniqRowId(row) === rowId)).filter(Boolean) as RowData[]);
    }
  };

  /**
   * handling header row selection for multi selection
   * @param checked checked status
   */
  const handleHeaderRowSelection = (checked: boolean) => {
    setIsHeaderMultiselect(checked);
    if (checked) {
      const selectedRowSet = new Set(selectedRows);
      sortedData.forEach((row) => {
        const rowId = getUniqRowId(row);
        selectedRowSet.add(rowId);
      });
      setSelectedRows(Array.from(selectedRowSet));
      getSelectedRows?.(rowData);
    } else {
      setSelectedRows([]);
      getSelectedRows?.([])
    }
  };

  /**
   * rendering the row selection cell in the header
   * @returns header html
   */
  const handleRowSelectionHeader = () => {
    return (
      <div className="singtel-grid-selection-cell">
        {rowSelection === 'single' && <div className="single" />}
        {rowSelection === 'multiple' && (
          <SingtelCheckBox
            checked={isHeaderMultiselect}
            onChange={handleHeaderRowSelection}
          />
        )}
      </div>
    );
  };

  /**
   * checking if a row is selected
   * @param rowId Uniq row id
   * @returns selected row ids
   */
  const isRowSelected = (rowId: string) => {
    return selectedRows.includes(rowId);
  };

  /**
   * rendering the header cell
   * @param columnDef Column definition
   * @returns Header cell html
   */
  const renderHeaderCell = (columnDef: ColumnDef) => {
    const isSortable = columnDef.isSort ?? false;
    const sortIcon = getSortIcon(columnDef.property);

    return (
      <div
        key={columnDef.property}
        className={`singtel-grid-header-cell ${columnDef.align ? columnDef.align : 'leftAligned'}`}
        style={{ width: columnDef.width }}
      >
        <div className={`${columnDef.align ? columnDef.align : 'leftAligned'}`}>{columnDef.headerName}</div>
        {isSortable && (
          <div className="singtel-grid-sort" onClick={() => isSortable && handleSort(columnDef.property)}>
            <div
              className={`singtel-grid-sort-icon ${sortIcon}`}
              role="button"
            />
          </div>
        )}
      </div>
    );
  };

  /**
   * rendering the row selection cell
   * @param rowId Uniq row id
   * @returns 
   */
  const renderRowSelectionCell = (rowId: string) => {
    const isSelected = isRowSelected(rowId);

    return (
      <div
        className={`singtel-grid-selection-cell`}
      >
        {rowSelection === 'single' && (
          <SingtelRadioButton
            checked={isSelected}
            onChange={() => handleRowSelection(rowId)}
          />
        )}
        {rowSelection === 'multiple' && (
          <SingtelCheckBox
            checked={isSelected}
            onChange={() => handleRowSelection(rowId)}
          />
        )}
      </div>
    );
  };

  /**
   * rendering a single row
   * @param row Row data
   * @returns Single row html
   */
  const renderRow = (row: RowData) => {
    const rowId = getUniqRowId(row);
    const isSelected = isRowSelected(rowId);

    return (
      <div
        key={rowId}
        className={`singtel-grid-row ${isSelected ? 'selected' : ''}`}
      >
        {rowSelection && renderRowSelectionCell(rowId)}
        {isMobileView && updatedColumnDefs.filter((columnDef) => columnDef.isDisplay !== false).length > 3 ? (
          <div className="singtel-grid-cell-mobile">
            {updatedColumnDefs.map((columnDef, columnIndex) => (
              <div key={columnIndex} style={{ display: 'flex' }}>
                <div className={`singtel-grid-cell-mobile-header`}>
                  {columnDef.headerName} :
                </div>
                <div className={`singtel-grid-cell-mobile-text`}>
                  {columnDef.cellRenderer ? (
                    columnDef.cellRenderer(row[columnDef.property], row)
                  ) : (
                    row[columnDef.property]
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          updatedColumnDefs.map((columnDef, columnIndex) => (
            <div className={`singtel-grid-cell ${columnDef.align ? columnDef.align : 'leftAligned'}`} style={{ width: columnDef.width }} key={columnIndex}>
              <div
                className={`singtel-grid-cell-text ${columnDef.align ? columnDef.align : 'leftAligned'}`}
                title={row[columnDef.property]}
              >
                {columnDef.cellRenderer ? (
                  columnDef.cellRenderer(row[columnDef.property], row)
                ) : (
                  row[columnDef.property]
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const sortedData = sortColumn
    ? rowData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        return sortOrder === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
      }
    })
    : rowData;

  return (
    <div className="singtel-grid" ref={gridRef}>
      {showHeader && (
        <div className="singtel-grid-header">
          {isMobileView && updatedColumnDefs.filter((columnDef) => columnDef.isDisplay !== false).length > 3 ? (
            <div className='singtel-grid-header-cell'>{mobileTitle}</div>
          ) : (
            <>
              {rowSelection && (
                <div className="singtel-grid-header-selection-cell">
                  {rowSelection && handleRowSelectionHeader()}
                </div>
              )}
              {updatedColumnDefs.map((columnDef) => renderHeaderCell(columnDef))}
            </>
          )}
        </div>
      )}
      <div className="singtel-grid-body">
        {sortedData.map((row) => renderRow(row))}
      </div>
      {sortedData.length === 0 && (
        <div className="singtel-grid-no-data">
          <div className="singtel-grid-no-data-text">No data available.</div>
        </div>
      )}
    </div>
  );
};

export default SingtelGrid;
