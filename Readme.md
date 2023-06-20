# Technical Document: SingtelGrid Component

## Overview
The SingtelGrid component is a reusable React component that provides a grid view for displaying tabular data. It offers features such as column sorting, row selection, custom cell rendering and responsive layout for mobile devices. 

## Demo
Here is the [Storybook url](https://codesandbox.io/p/github/e06widu/singtel-grid-library/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cliq9hdz3000b3b62yq7vvz2e%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cliq9hdz4000d3b62u6ge9szm%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B20.478540958658925%252C79.52145904134107%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cliq9hdz3000b3b62yq7vvz2e%2522%253A%257B%2522id%2522%253A%2522cliq9hdz3000b3b62yq7vvz2e%2522%252C%2522activeTabId%2522%253A%2522cliq9keyc00ba3b62j9xtrnbx%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cliq9hdz3000a3b62q758tbm9%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpackage.json%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FReadme.md%2522%252C%2522id%2522%253A%2522cliq9keyc00ba3b62j9xtrnbx%2522%252C%2522mode%2522%253A%2522temporary%2522%257D%255D%257D%252C%2522cliq9hdz4000d3b62u6ge9szm%2522%253A%257B%2522id%2522%253A%2522cliq9hdz4000d3b62u6ge9szm%2522%252C%2522activeTabId%2522%253A%2522cliq9keus009l3b622xl6zgcz%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cliq9hdz4000c3b62avkd7yt3%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%257D%252C%257B%2522id%2522%253A%2522cliq9jaxl004g3b62ta2you0v%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522cliq9jcyx002bfvha54la9evo%2522%257D%252C%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A6006%252C%2522id%2522%253A%2522cliq9keus009l3b622xl6zgcz%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%253Fpath%253D%252Fstory%252Fsingtelgrid--primary%2522%257D%252C%257B%2522id%2522%253A%2522cliq9lh2c00k53b62jv772nmo%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522cliq9ljfi002dfvhagpuwejeh%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Installation
To use the SingtelGrid component in your React project, you can follow these steps:

1. Create react Project

2. Install `SingtelGrid` library to your project
   
3. Import the `SingtelGrid` component in your project after installing hosted library

    ```typescript
    import SingtelGrid from './SingtelGrid';
    ```
3. Import default theme from the library to your project 

    ```typescript
    import '/node_modules/grid-lib/dist/style.css';
    ```

4. You are now ready to use the SingtelGrid component in your React application.

### Usage
The SingtelGrid component can be used by providing the necessary props. Here's an example of how to use the component:


```typescript
import SingtelGrid from './SingtelGrid';

const columnDefs = [
{ headerName: 'Name', property: 'name' },
{ headerName: 'Age', property: 'age', align: 'centerAligned' },
{ headerName: 'Email', property: 'email' },
];

const rowData = [
{ name: 'John Doe', age: 25, email: 'john@example.com' },
{ name: 'Jane Smith', age: 30, email: 'jane@example.com' },
// Additional row data...
];

const MyComponent = () => {
return (
    <SingtelGrid
    columnDefs={columnDefs}
    rowData={rowData}
    mobileTitle="User Details"
    showHeader={true}
    rowSelection="multiple"
    getSelectedRows={(selectedRows) => {
        console.log('Selected Rows:', selectedRows);
    }}
    />
);
};
```

In the example above, we define the columnDefs array to specify the columns in the grid and the rowData array to provide the data for the rows. We then render the SingtelGrid component with the specified props. The grid will display the data with the defined columns, allowing multiple row selection. The getSelectedRows callback function logs the selected rows to the console when row selection occurs.


### Props
The SingtelGrid component accepts the following props:

| Prop Name        | Type                      | Description                                                          |
| ---------------- | ------------------------- | -------------------------------------------------------------------- |
| `columnDefs`     | Array of `ColumnDef`      | An array of objects defining the column configuration for the grid.   |
| `rowData`        | Array of `RowData`        | An array of objects representing the row data to be displayed.        |
| `mobileTitle`    | string                    | The title to be displayed in mobile view.                             |
| `showHeader`     | boolean                   | Determines whether to show the grid header.                           |
| `rowSelection`   | string (optional)         | The type of row selection. Possible values: `"single"`, `"multiple"`.|
| `getSelectedRows`| function (optional)       | A callback function that receives the selected row(s) as an argument. |
| `getUniqRowId`   | function (optional)       | A function that returns a unique identifier for a row.                |


### ColumnDef

The `ColumnDef` interface represents a column definition in the grid. It has the following properties:

| Property Name    | Type                                            | Description                                                                                                                                                                  |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headerName`     | string                                          | The header name of the column.                                                                                                                                                |
| `property`       | string                                          | The property name of the column in the `RowData` object.                                                                                                                     |
| `width`          | number (optional)                               | The width of the column.                                                                                                                                                     |
| `align`          | `'rightAligned'` &#124; `'leftAligned'` &#124; `'centerAligned'` | The alignment of the column text. Possible values: `'rightAligned'`, `'leftAligned'`, `'centerAligned'`. Default: `'leftAligned'`.                                        |
| `isSort`         | boolean                                         | Specifies whether the column is sortable.                                                                                                                                     |
| `isDisplay`      | boolean                                         | Specifies whether the column should be displayed.                                                                                                                             |
| `cellRenderer`   | `(value: any, row: RowData) => React.ReactNode` | A custom cell renderer function that takes the cell `value` and the `row` data as arguments and returns the rendered content as a React node.                                      |


The `cellRenderer` function allows you to provide custom rendering for the cell content. It takes two arguments: `value`, representing the value of the cell, and `row`, representing the corresponding row data object.

```typescript
cellRenderer?: (value: any, row: RowData) => React.ReactNode;
```

## Features

### Column Sorting
The SingtelGrid component supports column sorting. To enable sorting for a column, set the `isSort` property to `true` in the corresponding column definition. Clicking on the column header will toggle between ascending and descending sorting order.

### Row Selection
The SingtelGrid component allows row selection. You can specify the row selection mode using the rowSelection prop:

- Set `rowSelection="single"` for single row selection.
- Set `rowSelection="multiple"` for multiple row selection.

When row selection occurs, the getSelectedRows callback function is called with the selected rows as an argument.

### Mobile View
The SingtelGrid component is responsive and adapts to different screen sizes, providing a mobile-friendly view for smaller devices. The visible columns is adjusted automatically in the mobile view to improve readability.

### Customization
The SingtelGrid component provides several customization options:

- You can customize the column appearance by specifying the alignment (align) and using a custom cell renderer function (cellRenderer) in the column definition.
- You can customize the mobile view title by setting the mobileTitle prop.
- You can customize the grid's appearance by overriding the CSS styles of the component and its child elements.

## Theming
The SingtelGrid library provides a default theme for the grid component, which includes the styling for various elements such as header cells, data cells, selection checkboxes, sorting icons, etc. 

However, if you want to customize the default theme to match your application's design or branding, you can do so by modifying the css variables

#### Customizing given theme
As example changing the background color of header change `--singtel-grid-header-background-color` value
```css
:root {
    --singtel-grid-header-background-color: green;
}
```


#### Creating your own theme
Create css file for custom theme and change the css variables and rules as follows

1. Add `singtel-grid-theme.css` 

```css
.singtel-grid-theme {
    --singtel-grid-header-background-color: #27bcd3;
}

.singtel-grid-theme .singtel-grid-header {
    background-color: var(--singtel-grid-header-background-color);
}
```

2. Import css file to component
```typescript
import './singtel-grid-theme.css'
```

3. Apply the theme as follows to `SingtelGrid`
```html
<div style={{ height: '400px' }}>
    <div className="singtel-grid-theme">
       <SingtelGrid {...args} />
    </div>
</div>
```

### CSS Properties

This is a list of custom CSS properties used in the project.

| Name                           | Description                          | Default |
|--------------------------------|--------------------------------------|---------|
| --singtel-grid-font-color      | Font color for the grid              | #000000 |
| --singtel-grid-background-color| Background color for the grid        | #fff    |
| --singtel-grid-header-background-color | Background color for the grid header | #F7F7F7 |
| --singtel-grid-font-family     | Font family for the grid              | 'AvenirLTStd', sans-serif |
| --row-selected-color           | Color for selected rows in the grid  | #EFEDFD |
| --row-divider-color            | Color for row dividers in the grid   | #E1E1E1 |
| --checkbox-checked-image       | URL for checked checkbox image       | '../assets/checkboxChecked.svg' |
| --checkbox-not-checked-image   | URL for unchecked checkbox image     | '../assets/checkboxNotChecked.svg' |
| --radio-checked-image          | URL for checked radio button image   | '../assets/radioChecked.svg' |
| --radio-not-checked-image      | URL for unchecked radio button image | '../assets/radioNotChecked.svg' |
| --singtel-grid-sort-icon-asc   | URL for ascending sort icon image    | '../assets/sortingUp.svg' |
| --singtel-grid-sort-icon-desc  | URL for descending sort icon image   | '../assets/sortingDown.svg' |
| --singtel-grid-sort-icon-neutral| URL for neutral sort icon image      | '../assets/sortingNeutral.svg' |
