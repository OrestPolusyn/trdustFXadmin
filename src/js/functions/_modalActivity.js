import {
  _remove,
  _add,
  _classList,
  _querySelector,
  _querySelectorAll,
} from '../_config';

const modalWindow = [...document[_querySelectorAll]('[data-modal]')];

const modalWindowBtnOpen = [
  ...document[_querySelectorAll]('[data-modal-open]'),
];

const modalWindowBtnClose = [
  ...document[_querySelectorAll]('[data-modal-close]'),
];

const closeModalWindow = btnToCloseModal => {
  let openModal = btnToCloseModal.closest('[data-modal]');

  openModal[_classList][_add]('hide');

  setTimeout(() => {
    openModal[_classList][_remove]('hide');
    modalWindow.forEach(modal => {
      modal.close();
    });
  }, 600);
};

if (modalWindowBtnOpen.length <= 0) return;
modalWindowBtnOpen.forEach(modalBtn => {
  modalBtn.addEventListener('click', e => {
    let modalOpenBtnName = e.target.dataset.modalOpen;

    modalWindow.forEach(modal => {
      if (modal.dataset.modal !== modalOpenBtnName) return;
      modal.show();
    });
  });
});

if (modalWindowBtnClose.length <= 0) return;
modalWindowBtnClose.forEach(closeModalBtn => {
  closeModalBtn.addEventListener('click', e => {
    const closeModal = e.target;
    closeModalWindow(closeModal);
  });
});
