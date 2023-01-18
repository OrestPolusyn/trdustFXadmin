import {
  _add,
  _remove,
  _querySelector,
  _querySelectorAll,
} from '../_config.js';

let tabsBtn = [...document[_querySelectorAll]('.tabs__btn')];
let tabsContent = [...document[_querySelectorAll]('.tabs__panel')];

if (tabsBtn.length <= 0) return;
for (let i = 0; i < tabsBtn.length; i += 1) {
  tabsBtn[i].index = i;
  tabsBtn[i].addEventListener('click', tabSwitcher);
}

function tabSwitcher() {
  tabsBtn.forEach(item => item.classList.remove('tabs__btn--active'));
  tabsContent.forEach(item => item.classList.remove('tabs__panel--active'));

  tabsContent[this.index].classList.add('tabs__panel--active');
  this.classList.add('tabs__btn--active');
}
