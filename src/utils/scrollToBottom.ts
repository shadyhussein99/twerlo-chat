/**
 * Smoothly scrolls to the bottom of a given element or the window.
 * If an element is given, it will be scrolled to the bottom of its content.
 * If `scrollWholePage` is `true`, the window will also be scrolled to the
 * bottom of its content. If `scrollWholePage` is `false` or undefined, only
 * the given element will be scrolled to the bottom of its content.
 * @param {React.RefObject<HTMLDivElement | null>} [ref] - Optional ref to the element to be scrolled.
 * @param {boolean} [scrollWholePage=true] - Whether to scroll the window or not.
 */
export const scrollToBottom = (
  ref?: React.RefObject<HTMLDivElement | null>,
  scrollWholePage: boolean = true
) => {
  // Scroll the window
  if (!ref?.current) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    return;
  }

  switch (scrollWholePage) {
    // Scroll the window and inner element
    case true:
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      break;

    // Scroll the inner element
    case false:
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
      break;
  }
};
