const scrollToTop = (distanceFromTop?: number) => {
  window.scrollTo({
    top: distanceFromTop || 0,
    behavior: 'smooth',
  });
};

export default scrollToTop;
