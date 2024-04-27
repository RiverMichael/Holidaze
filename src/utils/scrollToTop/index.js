export const scrollToTop = (path, currentPath) => {
  if (currentPath === path) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
