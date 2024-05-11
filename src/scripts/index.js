import '../pages/index.css';

import { initialCards } from './cards.js';
import { addCardsSet } from './card.js';
import { enablePopup } from './modal.js';

export function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function handleClickImage(evt) {
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  document.querySelector('.popup__caption').textContent = evt.target.alt;
}

export function handleClickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

addCardsSet(initialCards);

enablePopup(document.querySelector('.profile__edit-button'), document.querySelector('.popup_type_edit'), 'profile');
enablePopup(document.querySelector('.profile__add-button'), document.querySelector('.popup_type_new-card'), 'card');
enablePopup(document.querySelector('.places__list'), document.querySelector('.popup_type_image'), 'image');
