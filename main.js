import { copyElementStyleToAnother } from "./helpers.js"

const users = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]
const nameOfDefaultColumns = [
  'id',
  'name',
  'username',
  'email',
  'phone',
  'website',
  'company',
  'address'
]

const columnFormatter = {
  'company': (data) => {
    const p = document.createElement('p')
    const strong = document.createElement('strong')
    strong.textContent = ` (${data.catchPhrase})`
    p.append(data.name, strong)
    return p
  },
  'address': (data) => {
    const {
      street,
      suite,
      city,
      zipcode,
    } = data

    return `${street} ${suite} ${city} ${zipcode}`
  }
}

const table = createTable(nameOfDefaultColumns, users, columnFormatter)
table.classList.add('my-table')
document.body.appendChild(table)
const columnsContainer = table.querySelector('thead').firstElementChild
const elementsToPatch = table.querySelectorAll('tbody > tr')
makeColumnsSwappable(columnsContainer, elementsToPatch)

function createTable(columns, dataList, columnFormatter) {
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

function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
  columnsContainer.classList.add('columns-container')

  Array.from(columnsContainer.children).forEach((column) => {
    column.classList.add('column')
  })

  columnsContainer.addEventListener('pointerdown', e => {
    let lastCursorX = e.clientX
    let columnElements = [...columnsContainer.children]
    const firstTarget = e.target
    let firstTargetIndex = columnElements.indexOf(firstTarget)

    function preventDefault(e) {
      e.preventDefault()
    }

    document.addEventListener('selectstart', preventDefault)

    if (firstTargetIndex === -1)
      return

    columnsContainer.classList.add('moving')
    firstTarget.classList.add('moving')

    const firstTargetRect = firstTarget.getBoundingClientRect()
    const pointerOffset = {
      x: firstTargetRect.x - e.clientX,
      y: firstTargetRect.y - e.clientY
    }

    function createGhost() {
      const ghost = firstTarget.cloneNode(true)
      copyElementStyleToAnother(firstTarget, ghost)
      ghost.style.position = 'fixed'
      ghost.style.pointerEvents = 'none'
      ghost.style.left = e.clientX + pointerOffset.x + 'px'
      ghost.style.top = e.clientY + pointerOffset.y + 'px'
      document.body.appendChild(ghost)
      return ghost
    }

    const ghost = createGhost()

    function handleMove(e) {
      ghost.style.left = e.clientX + pointerOffset.x + 'px'
      ghost.style.top = e.clientY + pointerOffset.y + 'px'
      const newCursorX = e.clientX
      const secondTarget = e.target
      const secondTargetIndex = columnElements.indexOf(secondTarget)

      if (secondTargetIndex === -1)
        return

      if (firstTarget === secondTarget)
        return

      const isMoveToLeft = newCursorX < lastCursorX
      const isMoveToRight = newCursorX > lastCursorX
      lastCursorX = newCursorX

      const swapColumnInfo = {
        firstTargetIndex,
        secondTargetIndex,
        isMoveToLeft,
        isMoveToRight
      }

      swapColumns(columnsContainer, swapColumnInfo)

      elementsToPatch.forEach((columnsContainer) => {
        swapColumns(columnsContainer, swapColumnInfo)
      })

      columnElements = [...columnsContainer.children]
      firstTargetIndex = columnElements.indexOf(firstTarget)
    }

    function swapColumns(container, {
      firstTargetIndex,
      secondTargetIndex,
      isMoveToLeft,
      isMoveToRight
    }) {
      const columns = container.children
      const firstTarget = columns[firstTargetIndex]
      const secondTarget = columns[secondTargetIndex]

      if (isMoveToLeft) {
        secondTarget.insertAdjacentElement('beforebegin', firstTarget)
      } else if (isMoveToRight) {
        secondTarget.insertAdjacentElement('afterend', firstTarget)
      }
    }

    document.addEventListener('pointermove', handleMove)

    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('selectstart', preventDefault)
      ghost.remove()
      columnsContainer.classList.remove('moving')
      firstTarget.classList.remove('moving')
    }, { once: true })
  })
}

