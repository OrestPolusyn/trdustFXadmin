import { _classList, _querySelector } from '../_config.js';
import { addClassItem, removeClassItem } from '../functions/_toggleClassItem';

document[_querySelector]('.referal__copy')?.addEventListener('click', e => {
  const btnCopy = e.currentTarget;

  const textContent = e.currentTarget.querySelector(
    '.referal__copy-link'
  ).innerText;
  navigator.clipboard.writeText(textContent);

  if (navigator.clipboard.writeText(textContent)) {
    btnCopy.querySelector('.copy').classList.add('copied');

    setTimeout(() => {
      removeClassItem('.copy', 'copied');
    }, 5000);
  }
});
