import { copyElementStyleToAnother } from "./helpers.js"

export function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
  columnsContainer.classList.add('columns-container')
  elementsToPatch = [columnsContainer, ...elementsToPatch]

  Array.from(columnsContainer.children).forEach((column) => {
    column.classList.add('column')
  })

  columnsContainer.addEventListener('pointerdown', e => {
    const lockedY = e.clientY
    const firstTarget = e.target
    let lastCursorX = e.clientX
    let columnElements = [...columnsContainer.children]
    let firstTargetIndex = columnElements.indexOf(firstTarget)

    // prevent text selection when moving columns
    document.addEventListener('selectstart', preventDefault)

    if (firstTargetIndex === -1)
      return

    columnsContainer.classList.add('moving')
    firstTarget.classList.add('moving')

    const ghost = createGhostColumn({
      firstTarget,
      columnsContainer,
      pointerdownEvent: e,
    })

    firstTarget.classList.add('hide-content')

    function handleMove(e) {
      ghost.move(e)
      const newCursorX = e.clientX
      const secondTarget = document.elementFromPoint(newCursorX, lockedY)
      let secondTargetIndex = columnElements.indexOf(secondTarget)

      if (secondTargetIndex === -1
        || firstTarget === secondTarget
        || newCursorX === lastCursorX)
        return

      const isMoveToLeft = newCursorX < lastCursorX
      const isMoveToRight = newCursorX > lastCursorX
      lastCursorX = newCursorX

      if (isMoveToLeft && secondTargetIndex > firstTargetIndex
        || isMoveToRight && secondTargetIndex < firstTargetIndex)
        return

      const animateSwap = makeAnimateSwapFunc(firstTarget, secondTarget, elementsToPatch)

      swapColumns({
        columnsContainers: elementsToPatch,
        firstTargetIndex,
        secondTargetIndex,
        isMoveToLeft,
        isMoveToRight,
      })

      columnElements = [...columnsContainer.children]
      firstTargetIndex = columnElements.indexOf(firstTarget)
      secondTargetIndex = columnElements.indexOf(secondTarget)

      animateSwap(firstTargetIndex, secondTargetIndex)
    }

    document.addEventListener('pointermove', handleMove)

    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('selectstart', preventDefault)
      ghost.remove()
      columnsContainer.classList.remove('moving')
      firstTarget.classList.remove('moving')
      firstTarget.classList.remove('hide-content')
    }, { once: true })
  })
}

function swapColumns({
  columnsContainers,
  firstTargetIndex,
  secondTargetIndex,
  isMoveToLeft,
  isMoveToRight,
}) {
  columnsContainers.forEach((columnsContainer) => {
    const columns = columnsContainer.children
    const firstTarget = columns[firstTargetIndex]
    const secondTarget = columns[secondTargetIndex]

    if (isMoveToLeft) {
      secondTarget.insertAdjacentElement('beforebegin', firstTarget)
    } else if (isMoveToRight) {
      secondTarget.insertAdjacentElement('afterend', firstTarget)
    }
  })
}

function createGhostColumn({ firstTarget, pointerdownEvent, columnsContainer }) {
  const ghost = firstTarget.cloneNode(true)
  copyElementStyleToAnother(firstTarget, ghost)

  // handle edge case that border style is not cloned as expected
  if (ghost.style.borderCollapse === 'collapse') {
    const halfBorderWidth = (parseFloat(ghost.style.borderWidth) / 2)
    ghost.style.borderWidth = halfBorderWidth + 'px'
  }

  // calculate the pointer `x` and `y` distance
  // from `pointerdown` to `firstTarget`
  const firstTargetRect = firstTarget.getBoundingClientRect()
  const pointerOffset = {
    x: pointerdownEvent.clientX - firstTargetRect.x,
    y: pointerdownEvent.clientY - firstTargetRect.y
  }

  // set ghost initial position
  ghost.style.position = 'fixed'
  ghost.style.pointerEvents = 'none'
  ghost.style.left = pointerdownEvent.clientX - pointerOffset.x + 'px'
  ghost.style.top = pointerdownEvent.clientY - pointerOffset.y + 'px'

  // calculate the boundary that ghost can move
  const columnsContainerRect = columnsContainer.getBoundingClientRect()
  const ghostXBoundary = {
    min: columnsContainerRect.x,
    max: columnsContainerRect.right - firstTargetRect.width
  }

  // move ghost within the boundary on `pointermove`
  function moveGhost(pointermoveEvent) {
    const newCursorX = pointermoveEvent.clientX
    let newGhostX = newCursorX - pointerOffset.x

    if (newGhostX < ghostXBoundary.min) {
      newGhostX = ghostXBoundary.min
    } else if (newGhostX > ghostXBoundary.max) {
      newGhostX = ghostXBoundary.max
    }

    ghost.style.left = newGhostX + 'px'
  }

  ghost.move = moveGhost
  document.body.appendChild(ghost)

  return ghost
}

// need to be called before `swapColumns`
// to store the current rect information before swapping
function makeAnimateSwapFunc(firstTarget, secondTarget, columnsContainers) {
  const firstTargetRect = firstTarget.getBoundingClientRect()
  const secondTargetRect = secondTarget.getBoundingClientRect()

  // use web animation api to animate element
  function flip(element, invert) {
    element.animate([
      { transform: `translateX(${invert}px)` },
      { transform: `translateX(0px)` },
    ], {
      easing: 'ease-in-out',
      duration: 150
    })
  }

  // need to be called after `swapColumns` with
  // the latest `firstTargetIndex` and `secondTargetIndex`
  function animateSwap(firstTargetIndex, secondTargetIndex) {
    // calculate values to invert for FLIP https://aerotwist.com/blog/flip-your-animations/
    const newFirstTargetRect = firstTarget.getBoundingClientRect()
    const newSecondTargetRect = secondTarget.getBoundingClientRect()
    const firstTargetInvert = firstTargetRect.x - newFirstTargetRect.x
    const secondTargetInvert = secondTargetRect.x - newSecondTargetRect.x

    columnsContainers.forEach((columnsContainer) => {
      const columns = columnsContainer.children
      const firstTarget = columns[firstTargetIndex]
      const secondTarget = columns[secondTargetIndex]

      flip(firstTarget, firstTargetInvert)
      flip(secondTarget, secondTargetInvert)
    })
  }

  return animateSwap
}

function preventDefault(e) {
  e.preventDefault()
}