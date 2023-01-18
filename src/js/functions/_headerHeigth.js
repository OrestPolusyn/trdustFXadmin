import { _querySelector } from '../_config.js';

export const getHeaderHeight = () => {
  const headerHeight = document[_querySelector]('.header')?.offsetHeight;

  document.documentElement.style.setProperty(
    '--header-height',
    `${headerHeight}px`
  );

  return headerHeight;
};

window.addEventListener('resize', getHeaderHeight);
getHeaderHeight();
