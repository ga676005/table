import { copyElementStyleToAnother } from "./helpers.js"

export function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
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

