import { throttle } from './_throttle.js';

const fixFullheight = () => {
  let vh = window.innerHeight * 0.01;
  document.querySelector(':root').style.setProperty('--vh', `${vh}px`);
};

let fixHeight = throttle(fixFullheight);

fixHeight();

window.addEventListener('resize', fixHeight);
