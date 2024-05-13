export function showPopup(popup, click = false) {
  if (click) {
    document.addEventListener('click', handleClosePopup);
  } else {
    document.addEventListener('mousedown', handleClosePopup);
  }
  document.addEventListener('keydown', handleClosePopup);
  popup.classList.add('popup_is-opened');
}

export function hidePopup(popup) {
  document.removeEventListener('click', handleClosePopup);
  document.removeEventListener('mousedown', handleClosePopup);
  document.removeEventListener('keydown', handleClosePopup);
  popup.classList.remove('popup_is-opened');
}

export function enablePopupAnimation(popup) {
  popup.classList.add('popup_is-animated');
}

function handleClosePopup(evt) {
  const popup = document.querySelector('.popup_is-opened');
  const eventTargetClassList = evt.target.classList;

  if (
      eventTargetClassList.contains('popup_is-opened')
      || eventTargetClassList.contains('popup__close')
      || eventTargetClassList.contains('popup__image')
      || evt.key === 'Escape'
     )
       hidePopup(popup);
}
