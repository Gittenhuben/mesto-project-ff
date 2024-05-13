import '../pages/index.css';

import { initialCards } from './cards.js';
import { handleDeleteCard, handleClickLike, createCard } from './card.js';
import { showPopup, hidePopup, enablePopupAnimation } from './modal.js';

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImageImg = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const cardsList = document.querySelector('.places__list');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const inputCardName = popupNewCard.querySelector('input[name="place-name"]');
const inputCardLink = popupNewCard.querySelector('input[name="link"]');
const inputProfileName = popupProfile.querySelector('input[name="name"]');
const inputProfileDescription = popupProfile.querySelector('input[name="description"]');


function loadInfoFromProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function saveInfoToProfile() {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
}

function clearCardInfo() {
  inputCardName.value = '';
  inputCardLink.value = '';
}

function setPopupImageInfo(link, name) {
  popupImageImg.src = link;
  popupImageImg.alt = name;
  popupImageCaption.textContent = name;
}

function handleClickImage(link, name) {
  setPopupImageInfo(link, name);
  showPopup(popupImage, true);
}

function addCard(cardData, prepend = false) {
  const newCard = createCard(cardData, handleDeleteCard, handleClickImage, handleClickLike);
  if (prepend) {
    cardsList.prepend(newCard);
  } else {
    cardsList.append(newCard);
  }
}

function addCardsSet(cardsSet) {
  cardsSet.forEach(cardData => {
    addCard(cardData);
  });
}

function addCardFromPopup() {
  const cardData = {};
  cardData.name = inputCardName.value;
  cardData.link = inputCardLink.value;

  if (cardData.name != '' && cardData.link != '') {
    addCard(cardData, true);
    return true;
  } else {
    return false;
  }
}

function handleOpenPopupNewCard() {
  clearCardInfo();
  showPopup(popupNewCard);
}

function handleSubmitPopupNewCard(evt) {
  evt.preventDefault();
  if (addCardFromPopup()) hidePopup(popupNewCard);
}

function enablePopupNewCard() {
  buttonNewCard.addEventListener('click', handleOpenPopupNewCard);
  popupNewCardForm.addEventListener('submit', handleSubmitPopupNewCard);
}

function handleOpenPopupProfile() {
  loadInfoFromProfile();
  showPopup(popupProfile);
}

function handleSubmitPopupProfile(evt) {
  evt.preventDefault();
  saveInfoToProfile();
  hidePopup(popupProfile);
}

function enablePopupProfile() {
  buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
  popupProfileForm.addEventListener('submit', handleSubmitPopupProfile);
}

addCardsSet(initialCards);

enablePopupAnimation(popupProfile);
enablePopupAnimation(popupNewCard);
enablePopupAnimation(popupImage);

enablePopupNewCard();
enablePopupProfile();
