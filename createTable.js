import { makeColumnsResizable } from "./makeColumnsResizable.js"
import { makeColumnsSwappable } from "./makeColumnsSwappable.js"

export function createTable(columns, dataList, options = {}) {
  const {
    columnFormatter = {},
    resizeOptions = {},
    swapOptions = {},
  } = options

  const table = document.createElement('table')

  // create resizable structure if resize option is enable
  const thead = resizeOptions.enable
    ? createResizableTableHead(columns, resizeOptions)
    : createTableHead(columns)
  const tbody = createTableBody(columns, dataList, columnFormatter)
  table.append(thead, tbody)

  // make columns swappable if swap option is enable
  if (swapOptions.enable) {
    const columnsContainer = table.querySelector('thead').firstElementChild
    const elementsToPatch = table.querySelectorAll('tbody > tr')
    makeColumnsSwappable(columnsContainer, elementsToPatch)
  }

  return table
}

function createTableHead(columns, columnsLabel = {}) {
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  columns.forEach(columnKey => {
    const th = document.createElement('th')
    th.textContent = columnsLabel[columnKey] || columnKey
    tr.appendChild(th)
  });

  thead.appendChild(tr)
  return thead
}

function createTableBody(columns, dataList, columnFormatter) {
  const tbody = document.createElement('tbody')

  dataList.forEach(eachDataObject => {
    const tr = createTableRow(columns, eachDataObject, columnFormatter)
    tbody.appendChild(tr)
  });

  return tbody
}

function createTableRow(columns, dataOfTheRow, columnFormatter) {
  const tr = document.createElement('tr')
  columns.forEach((columnKey) => {
    const td = document.createElement('td')
    const columnValue = dataOfTheRow[columnKey]

    const formatterOfColumn = columnFormatter && columnFormatter[columnKey]
    if (formatterOfColumn) {
      const formatted = formatterOfColumn(columnValue)
      td.append(formatted)
    }
    else {
      td.textContent = columnValue
    }

    tr.appendChild(td)
  })

  return tr
}

function createResizableTableHead(columns, options = {}) {
  const {
    // settings for columns min width
    columnsMinWidth,

    // settings for columns label e.g. the column key from database
    // is firstName but we won't show that directly to end user
    // so we make a mapping like 'firstName' -> 'first name'
    columnsLabel = {}
  } = options

  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  columns.forEach(columnKey => {
    const th = document.createElement('th')
    // save column name on the element, so we know which column a element represents
    th.dataset.columnKey = columnKey

    // set display: flex; on `th` would break the table layout algorithm
    // so we need a wrapper `div` to do that
    const wrapper = document.createElement('div')
    wrapper.classList.add('resizable-column-wrapper')
    th.appendChild(wrapper)

    const content = document.createElement('div')
    const resizeHandle = document.createElement('div')
    content.classList.add('resizable-column-content')
    resizeHandle.classList.add('resizable-column-handle')
    // here we simply add text to a div, but we can also make a column formatter
    // similar to what we did for `createTableRow` if we need more complex markup
    content.textContent = columnsLabel[columnKey] || columnKey

    wrapper.append(content, resizeHandle)
    tr.appendChild(th)
  });

  makeColumnsResizable(tr, { columnsMinWidth })

  thead.appendChild(tr)
  return thead
}

