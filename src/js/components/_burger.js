import { _querySelector } from '../_config.js';
import { toggleClassItem } from '../functions/_toggleClassItem.js';

document[_querySelector]('.burger')?.addEventListener('click', e => {
  if (!e.target.matches('.burger')) return;
  toggleClassItem('.page', 'page--menu');
});

document[_querySelector]('span.nav__link')?.addEventListener('click', e => {
  e.target.classList.toggle('nav__link--hover');
});
