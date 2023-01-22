export function copyElementStyleToAnother(aElement, bElement) {
  const styles = window.getComputedStyle(aElement);

  let cssText = styles.cssText;

  if (!cssText) {
    cssText = Array.from(styles).reduce((str, property) => {
      return `${str}${property}:${styles.getPropertyValue(property)};`;
    }, '');
  }

  // 👇️ Assign css styles to element
  bElement.style.cssText = cssText;

  return styles
}

export function preventDefault(e) {
  e.preventDefault()
}