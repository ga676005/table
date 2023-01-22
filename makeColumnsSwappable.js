import { copyElementStyleToAnother } from "./helpers.js"

export function makeColumnsSwappable(columnsContainer, elementsToPatch = []) {
  columnsContainer.classList.add('swappable-columns-container')
  elementsToPatch = [columnsContainer, ...elementsToPatch]

  Array.from(columnsContainer.children).forEach((column) => {
    column.classList.add('swappable-column')
  })

  columnsContainer.addEventListener('pointerdown', e => {
    const lockedY = e.clientY
    const firstTarget = e.target.closest('.swappable-column')
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

    // add style to hide `firstTarget` content AFTER ghost has been created
    // otherwise the ghost will also have no content
    firstTarget.classList.add('hide-content')

    // when ghost touches the container edge, we will start scrolling 
    // we want to handle swap in this case as well
    ghost.element.addEventListener('custom:autoscroll', (e) => {
      const { direction, predictedGhostEdgeX } = e.detail

      handleSwap({
        isMoveToLeft: direction === 'left',
        isMoveToRight: direction === 'right',
        ghostLeft: predictedGhostEdgeX.left,
        ghostRight: predictedGhostEdgeX.right
      })
    })

    document.body.appendChild(ghost.element)


    function getSecondTarget(x, y) {
      if (!x || !y)
        return

      return document.elementFromPoint(x, y)?.closest('.swappable-column')
    }

    function handleMove(e) {
      const newCursorX = e.clientX
      const isMoveToLeft = newCursorX < lastCursorX
      const isMoveToRight = newCursorX > lastCursorX
      if (newCursorX === lastCursorX)
        return

      lastCursorX = newCursorX

      const { left, right } = ghost.move(e)

      handleSwap({
        isMoveToLeft,
        isMoveToRight,
        ghostLeft: left,
        ghostRight: right,
        cursorX: newCursorX
      })

    }

    function handleSwap({
      isMoveToLeft,
      isMoveToRight,
      ghostLeft,
      ghostRight,
      cursorX
    } = {}) {
      // control how much overlap between `ghost` and `secondTarget` before swap
      const OFFSET = 20

      let secondTarget
      if (isMoveToLeft) {
        secondTarget = getSecondTarget(ghostLeft + OFFSET, lockedY)
      }
      else if (isMoveToRight) {
        secondTarget = getSecondTarget(ghostRight - OFFSET, lockedY)
      }
      secondTarget = secondTarget ?? getSecondTarget(cursorX, lockedY)

      let secondTargetIndex = columnElements.indexOf(secondTarget)

      if (secondTargetIndex === -1
        || firstTarget === secondTarget
        || isMoveToLeft && secondTargetIndex > firstTargetIndex
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
    }
    else if (isMoveToRight) {
      secondTarget.insertAdjacentElement('afterend', firstTarget)
    }
  })
}

function createGhostColumn({ firstTarget, pointerdownEvent, columnsContainer }) {
  const ghost = firstTarget.cloneNode(true)
  const { width: firstTargetWidth } = copyElementStyleToAnother(firstTarget, ghost)
  const firstTargetRect = firstTarget.getBoundingClientRect()

  // handle edge case that border style is not cloned as expected
  if (ghost.style.borderCollapse === 'collapse') {
    const halfBorderWidth = (parseFloat(ghost.style.borderWidth) / 2)
    ghost.style.borderWidth = halfBorderWidth + 'px'
  }

  function getGhostBoundary({ columnsContainer, firstTargetRect, firstTargetWidth }) {
    const SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER = 40
    firstTargetWidth = parseFloat(firstTargetWidth)

    // the scrollable container might not be
    // the direct container of columns
    const container = getHorizontalScrollableContainer(columnsContainer) || columnsContainer
    const containerRect = container.getBoundingClientRect()
    const containerStyle = getComputedStyle(container)

    const containerContentBoxLeft = containerRect.x
      + parseFloat(containerStyle.paddingLeft)
      + parseFloat(containerStyle.borderLeftWidth)

    //  clientWidth is content box width + padding width
    const containerContentBoxWidth = container.clientWidth
      - parseFloat(containerStyle.paddingLeft)
      - parseFloat(containerStyle.paddingRight)

    const firstTargetIsBiggerThanContainer =
      firstTargetWidth > (containerContentBoxWidth - SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER)

    const ghostWidth = firstTargetIsBiggerThanContainer
      ? containerContentBoxWidth - SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER
      : firstTargetRect.width

    const ghostXBoundary = {
      min: containerContentBoxLeft,
      max: firstTargetIsBiggerThanContainer
        ? containerContentBoxLeft + SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER
        : containerContentBoxLeft + containerContentBoxWidth - firstTargetRect.width,
    }

    // the predicted edge the ghost can go
    // so we don't need to constantly get the latest position of ghost
    // on auto:scroll when we know it's already on the edge
    // containerContentBoxLeft is the point on container element
    // Math.ceil() and Math.floor() are used to make the value
    // narrower within the container
    const predictedGhostEdgeX = {
      left: Math.ceil(containerContentBoxLeft),
      right: Math.floor(containerContentBoxLeft + container.clientWidth)
    }

    return {
      ghostXBoundary,
      predictedGhostEdgeX,
      container,
      firstTargetIsBiggerThanContainer,
      SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER,
      ghostWidth
    }
  }

  const {
    ghostXBoundary,
    predictedGhostEdgeX,
    container,
    firstTargetIsBiggerThanContainer,
    SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER,
    ghostWidth
  } = getGhostBoundary({ columnsContainer, firstTargetRect, firstTargetWidth })

  if (firstTargetIsBiggerThanContainer) {
    ghost.style.minWidth = 'unset'
    ghost.style.width = ghostWidth + 'px'
  }


  function setGhostPosition({
    firstTargetRect,
    ghostXBoundary,
    firstTargetIsBiggerThanContainer,
    SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER
  }) {
    let initialGhostX = firstTargetRect.left

    if (initialGhostX < ghostXBoundary.min) {
      initialGhostX = ghostXBoundary.min
    }
    else if (initialGhostX > ghostXBoundary.max) {
      initialGhostX = ghostXBoundary.max
    }

    if (firstTargetIsBiggerThanContainer) {
      initialGhostX = ghostXBoundary.min + (SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER / 2)
    }

    ghost.style.position = 'fixed'
    ghost.style.pointerEvents = 'none'
    ghost.style.left = initialGhostX + 'px'
    ghost.style.top = firstTargetRect.top + 'px'

    const pointerOffset = {
      x: pointerdownEvent.clientX - initialGhostX,
      y: pointerdownEvent.clientY - firstTargetRect.top
    }

    return { pointerOffset }
  }

  const { pointerOffset } = setGhostPosition({
    firstTargetRect,
    ghostXBoundary,
    firstTargetIsBiggerThanContainer,
    SPARE_SPACE_BETWEEN_GHOST_AND_CONTAINER
  })

  const { startScroll, stopScroll, isScrollable } = getScrollContainerFunc(container)

  // move ghost within the boundary on `pointermove`
  function moveGhost(pointermoveEvent) {
    const newCursorX = pointermoveEvent.clientX
    let newGhostX = newCursorX - pointerOffset.x

    if (newGhostX < ghostXBoundary.min) {
      newGhostX = ghostXBoundary.min
      isScrollable && startScroll('left')
    }
    else if (newGhostX > ghostXBoundary.max) {
      newGhostX = ghostXBoundary.max
      isScrollable && startScroll('right')
    }
    else {
      isScrollable && stopScroll()
    }

    ghost.style.left = newGhostX + 'px'

    return {
      left: newGhostX,
      right: newGhostX + ghostWidth,
    }
  }

  function getScrollContainerFunc(container) {
    if (!container)
      return { isScrollable: false }

    let scrollId
    let currentDirection
    let speed = 5
    const INCREASE_SPEED = 0.5

    function startScroll(direction) {
      // increase scroll speed if moving towards same direction
      if (currentDirection === direction) {
        speed += INCREASE_SPEED
        return
      }

      stopScroll()
      currentDirection = direction

      scrollId = setInterval(() => {
        requestAnimationFrame(() => {
          if (direction === 'left') {
            container.scrollLeft -= speed
          }
          else if (direction === 'right') {
            container.scrollLeft += speed
          }

          // use a custom event to send a signal out that an auto scroll has happened
          // so we can make reaction to this action elsewhere
          const event = new CustomEvent('custom:autoscroll', {
            detail: {
              direction,
              predictedGhostEdgeX
            }
          })
          ghost.dispatchEvent(event)
        })
      }, 20);
    }

    function stopScroll() {
      if (!scrollId)
        return

      clearInterval(scrollId)
      scrollId = null
      currentDirection = null
      speed = 5
    }

    return { startScroll, stopScroll, isScrollable: true }
  }


  function remove() {
    ghost.remove()
    stopScroll()
  }

  return {
    element: ghost,
    move: moveGhost,
    remove,
  }
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

function getHorizontalScrollableContainer(element) {
  if (!element)
    return

  if (element.scrollWidth > element.clientWidth)
    return element

  return getHorizontalScrollableContainer(element.parentElement)
}