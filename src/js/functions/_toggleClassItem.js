import {
  _add,
  _remove,
  _toggle,
  _querySelector,
  _querySelectorAll,
  _classList,
} from '../_config';

export const addClassItem = (item, className) => {
  document[_querySelector](item)?.[_classList][_add](className);
};

export const removeClassItem = (item, className) => {
  document[_querySelector](item)?.[_classList][_remove](className);
};

export const toggleClassItem = (item, className) => {
  document[_querySelector](item)?.[_classList][_toggle](className);
};
