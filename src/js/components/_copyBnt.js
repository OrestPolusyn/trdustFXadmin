import { _querySelector } from '../_config.js';
import { addClassItem, removeClassItem } from '../functions/_toggleClassItem';

document[_querySelector]('.copy').addEventListener('click', e => {
  const btnCopy = e.target.classList;

  const textContent = e.target.previousElementSibling.innerText;
  navigator.clipboard.writeText(textContent);

  if (navigator.clipboard.writeText(textContent)) {
    btnCopy.add('copied');

    setTimeout(() => {
      removeClassItem('.copy', 'copied');
    }, 5000);
  }
});
