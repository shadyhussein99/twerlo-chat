// Handle element scrolling in case of multiple scrollable elements inside each other

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
