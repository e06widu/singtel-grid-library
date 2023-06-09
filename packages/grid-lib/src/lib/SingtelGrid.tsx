import React, { useEffect, useRef, useState } from 'react';
import './SingtelGrid.css';
import '../fonts/AvenirLTStd.css';
import sortingUpIcon from '../assets/sortingUp.svg';
import sortingDownIcon from '../assets/sortingDown.svg';
import sortingNeutralIcon from '../assets/sortingNeutral.svg';

import SingtelCheckBox from './SingtelCheckBox';
import SingtelRadioButton from './SingtelRadioButton';
import { ColumnDef, RowData, SingtelGridProps } from './models';

const SingtelGrid: React.FC<SingtelGridProps> = ({
  columnDefs,
  rowData,
  mobileTitle,
  showHeader = true,
  rowSelection,
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


  useEffect(() => {
    const updatedColumnDefs = columnDefs.map((columnDef) => {
      if (!columnDef.width) {
        const updatedWidth = ((gridWidth - (isMobileView ? 68 : 84)) / columnDefs.length)
        return { ...columnDef, width: updatedWidth };
      }
      return columnDef;
    });
    setUpdatedColumnDefs(updatedColumnDefs)
  }, [columnDefs, gridWidth, isMobileView]);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? sortingDownIcon : sortingUpIcon;
    } else {
      return sortingNeutralIcon;
    }
  };

  const handleRowSelection = (rowId: string) => {
    if (rowSelection === 'single') {
      setSelectedRows([rowId]);
    } else if (rowSelection === 'multiple') {
      const selectedRowSet = new Set(selectedRows);
      if (selectedRowSet.has(rowId)) {
        selectedRowSet.delete(rowId);
      } else {
        selectedRowSet.add(rowId);
      }
      setSelectedRows(Array.from(selectedRowSet));
    }
  };

  const handleHeaderRowSelection = (checked: boolean) => {
    setIsHeaderMultiselect(checked);
    if (checked) {
      const selectedRowSet = new Set(selectedRows);
      sortedData.map((row) => {
        const rowId = getUniqRowId(row);
        selectedRowSet.add(rowId);
      });
      setSelectedRows(Array.from(selectedRowSet));
    } else {
      setSelectedRows([]);
    }
  };

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

  const isRowSelected = (rowId: string) => {
    return selectedRows.includes(rowId);
  };

  const renderHeaderCell = (columnDef: ColumnDef) => {
    const isSortable = columnDef.isSort ?? false;
    const sortIcon = getSortIcon(columnDef.property);

    return (
      <div
        key={columnDef.property}
        className={`singtel-grid-header-cell`}
        style={{ width: columnDef.width }}
      >
        <div className={`${columnDef.align ? columnDef.align : 'leftAligned'}`}>{columnDef.headerName}</div>
        {isSortable && (
          <div className="singtel-grid-sort"
            onClick={() => isSortable && handleSort(columnDef.property)}>
            <img
              src={sortIcon}
              alt="Sort Icon"
              className="singtel-grid-sort-icon"
            />
          </div>
        )}
      </div>
    );
  };

  const renderRowSelectionCell = (rowId: string) => {
    const isSelected = isRowSelected(rowId);
    const selectionBgColor = isSelected ? '#EFEDFD' : '';

    return (
      <div
        className="singtel-grid-selection-cell"
        style={{ backgroundColor: selectionBgColor }}
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

  const renderRow = (row: RowData) => {
    const rowId = getUniqRowId(row);
    const isSelected = isRowSelected(rowId);
    const selectionBgColor = isSelected ? '#EFEDFD' : '';

    return (
      <div
        key={rowId}
        className="singtel-grid-row"
        style={{ backgroundColor: selectionBgColor }}
      >
        {rowSelection && renderRowSelectionCell(rowId)}
        {(isMobileView && updatedColumnDefs.length > 3) ? (
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
            <div className='singtel-grid-cell' style={{ width: columnDef.width }} key={columnIndex}>
              <div
                className={`singtel-grid-cell-text ${columnDef.align ? columnDef.align : 'leftAligned'
                  }`}
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


  const sortedData = [...rowData].sort((a: RowData, b: RowData) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
    }

    return 0;
  });

  return (
    <div className="singtel-grid" ref={gridRef}>
      {showHeader && (
        <div className="singtel-grid-header">
          {isMobileView && columnDefs.length > 3 ? (
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
    </div>
  );
};

export default SingtelGrid;
