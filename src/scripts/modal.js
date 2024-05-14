export function showPopup(popup) {
  document.addEventListener('keydown', handleClosePopupByEscape);
  popup.classList.add('popup_is-opened');
}

export function hidePopup(popup) {
  document.removeEventListener('keydown', handleClosePopupByEscape);
  popup.classList.remove('popup_is-opened');
}

export function enablePopupAnimation(popup) {
  popup.classList.add('popup_is-animated');
}

function handleClosePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    hidePopup(popup);
  }
}

export function handleClosePopupByClickOverlay(evt) {
  const popup = evt.target;
  if (evt.target.classList.contains('popup_is-opened')) hidePopup(popup);
}
