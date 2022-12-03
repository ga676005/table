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
document.body.appendChild(table)
const columnsContainer = table.querySelector('thead').firstElementChild
const elementsToPatch = table.querySelectorAll('tbody > tr')
makeColumnsSwappable(columnsContainer, elementsToPatch)

// makeColumnsDraggable(columnsContainer, {
//   onMoveEnd: (e) => {
//   },
//   elementsToPatch: [
//     columnsContainer,
//     ...table.querySelectorAll('tbody > tr')
//   ]
// })

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

function makeColumnsDraggable(container, options = {}) {
  const {
    elementsToPatch = [container],
    onMoveEnd = (e) => { }
  } = options

  let isDragging = false
  let columnsElement = [...container.children]
  // columnsElement.forEach()

  container.addEventListener('dragstart', e => e.preventDefault())

  document.addEventListener('pointerdown', e => {
    const draggedColumn = columnsElement.find(el => el === e.target)
    if (!draggedColumn)
      return

    isDragging = true
    const indexOfDraggedColumn = columnsElement.indexOf(draggedColumn)
    console.log({ indexOfDraggedColumn })

    document.addEventListener('pointermove', handleMove)

    document.addEventListener('pointerup', e => {
      stopDragging()

      const pointerColumn = columnsElement.find(el => el === e.target)
      if (!pointerColumn)
        return

      const indexOfPointerColumn = columnsElement.indexOf(pointerColumn)
      console.log({ indexOfPointerColumn })
      if (indexOfDraggedColumn === indexOfPointerColumn)
        return

      draggedColumn.parentElement.insertBefore(draggedColumn, pointerColumn)

      // swapColumns(elementsToPatch, indexOfDraggedColumn, indexOfPointerColumn)

      columnsElement = [...container.children]
    }, { once: true })

    document.addEventListener('dragover', e => {
      console.log('dragover')
      stopDragging()
    }, { once: true })
  })

  function handleMove(e) {
    if (!isDragging)
      return

    // because of event propagation 
    // e.target could be other elements inside the column element 
    // we want to make sure we find the column element
    const columnOnPointer = columnsElement.find(el => el === e.target)
    if (!columnOnPointer)
      return

    console.log('moving', columnOnPointer)
  }

  function stopDragging() {
    isDragging = false
    console.log('stopDragging')
    document.removeEventListener('pointermove', handleMove)
  }


  function swapColumns(elements, moveStartIndex, moveEndIndex) {
    elements.forEach((columnsContainer) => {
      const columns = columnsContainer.children
      const moveStartElement = columns[moveStartIndex]
      const elementToSwap = columns[moveEndIndex]

      // swap with the right column
      if (moveStartIndex + 1 === moveEndIndex) {
        columnsContainer.insertBefore(elementToSwap, moveStartElement)
        return
      }

      // swap with the left column
      if (moveStartIndex - 1 === moveEndIndex) {
        columnsContainer.insertBefore(moveStartElement, elementToSwap)
        return
      }

      // we use `insertBefore`, so we need an anchor point to swap
      // anchorElement could be `undefined` when we swap the last column
      // MDN says we should pass null,
      // so the element can be correctly inserted at the end
      const anchorElement = columns[moveStartIndex + 1] || null

      // move `moveStartElement` before `elementToSwap`
      // `moveStartElement` is now before `elementToSwap`
      columnsContainer.insertBefore(moveStartElement, elementToSwap)

      // move `elementToSwap` before the `anchorElement`
      // because `elementToSwap` is moved to other place
      // `moveStartElement` becomes to be at the correct position
      columnsContainer.insertBefore(elementToSwap, anchorElement)
    })
  }
}


function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
  columnsContainer.addEventListener('pointerdown', e => {
    let columnElements = [...columnsContainer.children]
    const firstTarget = e.target
    let firstTargetIndex = columnElements.indexOf(firstTarget)

    function preventDefault(e) {
      e.preventDefault()
    }

    document.addEventListener('selectstart', preventDefault)

    if (firstTargetIndex === -1)
      return

    function handleMove(e) {
      const secondTarget = e.target
      const secondTargetIndex = columnElements.indexOf(secondTarget)

      if (secondTargetIndex === -1)
        return

      if (firstTarget === secondTarget)
        return

      swapColumns(columnsContainer, firstTargetIndex, secondTargetIndex)

      elementsToPatch.forEach((columnsContainer) => {
        swapColumns(columnsContainer, firstTargetIndex, secondTargetIndex)
      })

      columnElements = [...columnsContainer.children]
      firstTargetIndex = columnElements.indexOf(firstTarget)
    }

    function swapColumns(container, firstTargetIndex, secondTargetIndex) {
      const columns = container.children
      const firstTarget = columns[firstTargetIndex]
      const secondTarget = columns[secondTargetIndex]
      const isMoveToLeft = firstTargetIndex > secondTargetIndex
      const isMoveToRight = firstTargetIndex < secondTargetIndex

      if (isMoveToLeft) {
        secondTarget.insertAdjacentElement('beforebegin', firstTarget)
      } else if (isMoveToRight) {
        secondTarget.insertAdjacentElement('afterend', firstTarget)
      }
    }

    columnsContainer.addEventListener('pointermove', handleMove)

    document.addEventListener('pointerup', () => {
      columnsContainer.removeEventListener('pointermove', handleMove)
      document.removeEventListener('selectstart', preventDefault)
    }, { once: true })
  })
}



// function swapTwoArrayElement(array, index1, index2) {
//   const newArr = [...array]
//   const tempKey = newArr[index1]
//   newArr[index1] = newArr[index2]
//   newArr[index2] = tempKey
//   return newArr
// }

