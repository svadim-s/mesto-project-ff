export function openPopup(popup) {
  popup.classList.add('popup_is-animated');

  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0);

  document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 500);

  document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
}

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}