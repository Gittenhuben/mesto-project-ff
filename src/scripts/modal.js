import { addCardFromPopup } from './card.js';

function loadInfoFromProfile() {
  const popup = document.querySelector('.popup_type_edit');
  const inputName = popup.querySelector('input[name="name"]');
  const inputDescription = popup.querySelector('input[name="description"]');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function saveInfoToProfile() {
  const popup = document.querySelector('.popup_type_edit');
  const inputName = popup.querySelector('input[name="name"]');
  const inputDescription = popup.querySelector('input[name="description"]');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
}

function clearCardInfo() {
  const popup = document.querySelector('.popup_type_new-card');
  const inputName = popup.querySelector('input[name="place-name"]');
  const inputLink = popup.querySelector('input[name="link"]');

  inputName.value = '';
  inputLink.value = '';
}

function handleClosePopup(evt) {
  const popup = document.querySelector('.popup_is-opened');
  let eventTargetClassList;
  if (evt) eventTargetClassList = evt.target.classList;

  if (
      !evt
      || eventTargetClassList.contains('popup_is-opened')
      || eventTargetClassList.contains('popup__close')
      || eventTargetClassList.contains('popup__image')
      || evt.key === 'Escape'
     )
       {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('click', handleClosePopup);
        document.removeEventListener('keydown', handleClosePopup);
       }
}

export function enablePopup(button, popup, popupType) {
  popup.classList.add('popup_is-animated');

  button.addEventListener('click', function(evt) {
    if (popupType !== 'image' || evt.target.classList.contains('card__image')) {
      popup.classList.add('popup_is-opened');
      document.addEventListener('click', handleClosePopup);
      document.addEventListener('keydown', handleClosePopup);
      if (popupType === 'profile') loadInfoFromProfile();
      if (popupType === 'card') clearCardInfo();
    }
  });

  if (popupType === 'profile' || popupType === 'card') {
    popup.addEventListener('submit', function(evt) {
      evt.preventDefault();
      if (popupType === 'profile') saveInfoToProfile();
      if (popupType === 'card') addCardFromPopup();
      handleClosePopup();
    });
  }
}
