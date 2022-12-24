export function createTable(columns, dataList, columnFormatter) {
  const table = document.createElement('table')
  const thead = createTableHead(columns)
  const tbody = createTableBody(columns, dataList, columnFormatter)
  table.appendChild(thead)
  table.appendChild(tbody)
  return table
}

function createTableHead(columns) {
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')

  columns.forEach(columnName => {
    const th = document.createElement('th')
    th.textContent = columnName
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
  columns.forEach((columnName) => {
    const td = document.createElement('td')
    const columnValue = dataOfTheRow[columnName]

    const formatterOfColumn = columnFormatter && columnFormatter[columnName]
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
