import { preventDefault } from "./helpers.js"

export function makeColumnsResizable(columnsContainer, options = {}) {
  const {
    // elements to resize together with the target column
    elementsToPatch = [],
    // setting of each column min width
    columnsMinWidth = {},
    // default value of each column min width
    DEFAULT_MIN_COLUMN_WIDTH = 100
  } = options

  columnsContainer.classList.add('resizable-columns-container')
  const _elementsToPatch = [columnsContainer, ...elementsToPatch]

  const columnElements = [...columnsContainer.children]
  columnElements.forEach((column) => {
    column.classList.add('resizable-column')
    const minWidthSetting = columnsMinWidth[column.dataset.columnKey]
    if (minWidthSetting) {
      // set width does not work on table because it has built-in layout algorithm
      column.style.minWidth = minWidthSetting + 'px'
      // we are still setting because `makeColumnsResizable` is not made specifically for table
      column.style.width = minWidthSetting + 'px'
    }
  })

  columnsContainer.addEventListener('pointerdown', e => {
    // because we use event delegation pattern, `e.target` could be other irrelevant elements
    // so we need to make sure that the event is triggered by a resize handle
    const resizeHandle = e.target.closest('.resizable-column-handle')
    if (!resizeHandle)
      return

    // stop event propagation so we don't trigger resize and swap at the same time
    // this is used with { capture: true } to make sure this event handler has 
    // higher priority and don't propagate to others.
    // it is also possible to use e.stopImmediatePropagation() in this case
    // because this event listener of 'pointerdown' is added 
    // before the one from `makeColumnsSwappable`
    e.stopPropagation()

    const column = e.target.closest('.resizable-column')
    const indexOfColumn = [...columnsContainer.children].indexOf(column)
    const minColumnWidth = columnsMinWidth[column.dataset.columnKey] || DEFAULT_MIN_COLUMN_WIDTH

    // prevent text selection when moving columns
    document.addEventListener('selectstart', preventDefault)

    const initialColumnWidth = parseFloat(getComputedStyle(column).width)
    const initialCursorX = e.clientX

    // elements that are in the same column
    const elementsToResize = _elementsToPatch.map((columnsContainer) => {
      return columnsContainer.children[indexOfColumn]
    })

    // calculate how much to resize
    function handleMove(e) {
      const newCursorX = e.clientX
      const moveDistance = newCursorX - initialCursorX
      let newColumnWidth = initialColumnWidth + moveDistance

      // we don't want to resize column width below its minimal value
      // so if `newColumnWidth` is lower than `minColumnWidth`
      // we want to use `minColumnWidth`, which value would be 
      // the "bigger" one of Math.max()
      newColumnWidth = Math.max(newColumnWidth, minColumnWidth)

      // if we need to frequently update UI, use
      // `requestAnimationFrame` to make it optimal
      requestAnimationFrame(() => {
        elementsToResize.forEach((element) => {
          element.style.minWidth = newColumnWidth + 'px'
          element.style.width = newColumnWidth + 'px'
        })
      })
    }

    document.addEventListener('pointermove', handleMove)

    // clean up event listeners
    document.addEventListener('pointerup', e => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('selectstart', preventDefault)

      // this clean up listener only needs to run once after 'pointerdown'
    }, { once: true })

    // capture of 'pointerdown' is used with e.preventDefault() as mentioned above
  }, { capture: true })
}
