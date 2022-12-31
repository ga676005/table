import { copyElementStyleToAnother } from "./helpers.js"

export function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
  columnsContainer.classList.add('columns-container')

  Array.from(columnsContainer.children).forEach((column) => {
    column.classList.add('column')
  })

  columnsContainer.addEventListener('pointerdown', e => {
    const lockedY = e.clientY
    const firstTarget = e.target
    const columnsContainerRect = columnsContainer.getBoundingClientRect()
    let lastCursorX = e.clientX
    let columnElements = [...columnsContainer.children]
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

    const ghostXBoundary = {
      min: columnsContainerRect.x,
      max: columnsContainerRect.right - firstTargetRect.width
    }

    function createGhost() {
      const ghost = firstTarget.cloneNode(true)
      copyElementStyleToAnother(firstTarget, ghost)

      if (ghost.style.borderCollapse === 'collapse') {
        const halfBorderWidth = (parseFloat(ghost.style.borderWidth) / 2)
        ghost.style.borderWidth = halfBorderWidth + 'px'
      }

      ghost.style.position = 'fixed'
      ghost.style.pointerEvents = 'none'
      ghost.style.left = e.clientX + pointerOffset.x + 'px'
      ghost.style.top = e.clientY + pointerOffset.y + 'px'
      document.body.appendChild(ghost)

      return ghost
    }

    const ghost = createGhost()

    function handleMove(e) {
      const newCursorX = e.clientX
      let newGhostX = newCursorX + pointerOffset.x

      if (newGhostX < ghostXBoundary.min)
        newGhostX = ghostXBoundary.min
      else if (newGhostX > ghostXBoundary.max) {
        newGhostX = ghostXBoundary.max
      }

      ghost.style.left = newGhostX + 'px'

      const secondTarget = document.elementFromPoint(newCursorX, lockedY)
      const secondTargetIndex = columnElements.indexOf(secondTarget)

      if (secondTargetIndex === -1)
        return

      if (firstTarget === secondTarget)
        return

      if (newCursorX === lastCursorX)
        return

      const isMoveToLeft = newCursorX < lastCursorX
      const isMoveToRight = newCursorX > lastCursorX
      lastCursorX = newCursorX

      if (isMoveToLeft && secondTargetIndex > firstTargetIndex
        || isMoveToRight && secondTargetIndex < firstTargetIndex)
        return

      const firstTargetRect = firstTarget.getBoundingClientRect()
      const secondTargetRect = secondTarget.getBoundingClientRect()

      const swapColumnInfo = {
        firstTargetIndex,
        secondTargetIndex,
        isMoveToLeft,
        isMoveToRight,
      }

      swapColumns(columnsContainer, swapColumnInfo)

      elementsToPatch.forEach((columnsContainer) => {
        swapColumns(columnsContainer, swapColumnInfo)
      })

      const newFirstTargetRect = firstTarget.getBoundingClientRect()
      const newSecondTargetRect = secondTarget.getBoundingClientRect()
      const firstTargetInvert = firstTargetRect.x - newFirstTargetRect.x
      const secondTargetInvert = secondTargetRect.x - newSecondTargetRect.x

      animationSwap({ firstTarget, secondTarget, firstTargetInvert, secondTargetInvert })

      columnElements = [...columnsContainer.children]
      firstTargetIndex = columnElements.indexOf(firstTarget)
    }

    function swapColumns(container, {
      firstTargetIndex,
      secondTargetIndex,
      isMoveToLeft,
      isMoveToRight,
    }) {
      const columns = container.children
      const firstTarget = columns[firstTargetIndex]
      const secondTarget = columns[secondTargetIndex]

      if (isMoveToLeft) {
        secondTarget.insertAdjacentElement('beforebegin', firstTarget)
        console.log('swap left')
        // animate()
      } else if (isMoveToRight) {
        console.log('swap right')
        secondTarget.insertAdjacentElement('afterend', firstTarget)
        // animate()
      } else {
        console.log('else')
      }

      // document.body.getBoundingClientRect()
      // document.body.animate().finished
    }

    function animationSwap({ firstTarget, secondTarget, firstTargetInvert, secondTargetInvert }) {
      requestAnimationFrame(() => {
        firstTarget.animate([
          { transform: `translateX(${firstTargetInvert}px)` },
          { transform: `translateX(0px)` },
        ], {
          easing: 'ease-in-out',
          duration: 150
        })

        secondTarget.animate([
          { transform: `translateX(${secondTargetInvert}px)` },
          { transform: `translateX(0px)` },
        ], {
          easing: 'ease-in-out',
          duration: 150
        })
      })
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

