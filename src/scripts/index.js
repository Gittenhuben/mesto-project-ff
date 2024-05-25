import '../pages/index.css';

import { createCard, handleClickLike } from './card.js';
import { showPopup, hidePopup, enablePopupAnimation, handleClosePopupByClickOverlay } from './modal.js';
import { enableValidation, refreshValidState } from './validation.js';
import { loadDataFromServerRequest, updateServerProfile, uploadCard, deleteCardOnServer, updateServerAvatar } from './api.js';

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupConfirmation = document.querySelector('.popup_type_confirmation');
const popupAvatar = document.querySelector('.popup_type_avatar');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImageImg = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const cardsList = document.querySelector('.places__list');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const avatar = document.querySelector('.profile__image');

const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const popupConfirmationForm = popupConfirmation.querySelector('.popup__form');

const inputCardName = popupNewCard.querySelector('input[name="place-name"]');
const inputCardLink = popupNewCard.querySelector('input[name="link"]');
const inputProfileName = popupProfile.querySelector('input[name="name"]');
const inputProfileDescription = popupProfile.querySelector('input[name="description"]');
const inputAvatarLink = popupAvatar.querySelector('input[name="avatar-link"]');

const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupConfirmationCloseButton = popupConfirmation.querySelector('.popup__close');
const popupAvatarCloseButton = popupAvatar.querySelector('.popup__close');

const popupProfileSubmitButton = popupProfile.querySelector('.popup__button');
const popupNewCardSubmitButton = popupNewCard.querySelector('.popup__button');
const popupAvatarSubmitButton = popupAvatar.querySelector('.popup__button');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


let cardForDelete;
let myId = 0;

function setPendingText(submitButton, state, timeout = 600) {
  if (state) {
    submitButton.textContent = 'Сохранение\u2026';
  } else {
    setTimeout(() => {
      submitButton.textContent = 'Сохранить';
    }, timeout);
  }
}

function loadInfoFromProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function saveInfoToProfile(data, about) {
  profileName.textContent = data;
  profileDescription.textContent = about;
}

function loadInfoFromAvatar() {
  inputAvatarLink.value = avatar.style.backgroundImage.slice(5,-2);
}

function saveInfoToAvatar(link) {
  avatar.style.backgroundImage = 'url("' + link + '")';
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
  showPopup(popupImage);
}

function handleDeleteCard(evt) {
  cardForDelete = evt.target.closest('.card');
  showPopup(popupConfirmation);
}

function addCard(cardData, prepend = false) {
  const newCard = createCard(cardData, handleDeleteCard, handleClickImage, handleClickLike, myId);
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
  cardData.owner = { _id: myId };
  
  return uploadCard(cardData)
    .then(res => {
      cardData._id = res;
      addCard(cardData, true);
    })
    .catch(err => {
      console.log('Ошибка выгрузки карточки на сервер');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

////// NewCard Popup

function handleOpenPopupNewCard() {
  clearCardInfo();
  refreshValidState(popupNewCardForm, validationSettings, true);
  showPopup(popupNewCard);
}

function handleSubmitPopupNewCard(evt) {
  evt.preventDefault();
  setPendingText(popupNewCardSubmitButton, true);
  addCardFromPopup()
    .then(() => {
      hidePopup(popupNewCard);
      setPendingText(popupNewCardSubmitButton, false);
    })
    .catch(() => {
      setPendingText(popupNewCardSubmitButton, false, 0);
    })
}

function handleClosePopupByClickButton(evt) {
  const popup = evt.target.closest('.popup');
  hidePopup(popup);
}

function enablePopupNewCard() {
  buttonNewCard.addEventListener('click', handleOpenPopupNewCard);
  popupNewCardForm.addEventListener('submit', handleSubmitPopupNewCard);
  popupNewCardCloseButton.addEventListener('click', handleClosePopupByClickButton);
  popupNewCard.addEventListener('mousedown', handleClosePopupByClickOverlay);
}

////// Profile Popup

function handleOpenPopupProfile() {
  loadInfoFromProfile();
  refreshValidState(popupProfileForm, validationSettings);
  showPopup(popupProfile);
}

function handleSubmitPopupProfile(evt) {
  evt.preventDefault();
  setPendingText(popupProfileSubmitButton, true);
  updateServerProfile(inputProfileName.value, inputProfileDescription.value)
    .then(data => {
      saveInfoToProfile(data.name, data.about);
      hidePopup(popupProfile);
      setPendingText(popupProfileSubmitButton, false);
    })
    .catch(() => {
      setPendingText(popupProfileSubmitButton, false, 0);
    })
}

function enablePopupProfile() {
  buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
  popupProfileForm.addEventListener('submit', handleSubmitPopupProfile);
  popupProfileCloseButton.addEventListener('click', handleClosePopupByClickButton);
  popupProfile.addEventListener('mousedown', handleClosePopupByClickOverlay);
}

////// Image Popup

function enablePopupImage() {
  popupImageCloseButton.addEventListener('click', handleClosePopupByClickButton);
  popupImageImg.addEventListener('click', handleClosePopupByClickButton);
  popupImage.addEventListener('mousedown', handleClosePopupByClickOverlay);
}

////// Avatar Popup

function handleOpenPopupAvatar() {
  loadInfoFromAvatar();
  refreshValidState(popupAvatarForm, validationSettings);
  showPopup(popupAvatar);
}

function handleSubmitPopupAvatar(evt) {
  evt.preventDefault();
  setPendingText(popupAvatarSubmitButton, true);
  updateServerAvatar(inputAvatarLink.value)
    .then(data => {
      saveInfoToAvatar(data.avatar);
      hidePopup(popupAvatar);
      setPendingText(popupAvatarSubmitButton, false);
    })
    .catch(() => {
      setPendingText(popupAvatarSubmitButton, false, 0);
    })
}

function enablePopupAvatar() {
  avatar.addEventListener('click', handleOpenPopupAvatar);
  popupAvatarForm.addEventListener('submit', handleSubmitPopupAvatar);
  popupAvatarCloseButton.addEventListener('click', handleClosePopupByClickButton);
  popupAvatar.addEventListener('mousedown', handleClosePopupByClickOverlay);
}

////// Confirmation Popup

function handleSubmitPopupConfirmation(evt) {
  const cardId = cardForDelete.dataset.imageId;
  evt.preventDefault();
  deleteCardOnServer(cardId)
    .then(() => {
      cardForDelete.remove();
      hidePopup(popupConfirmation);
    })
    .catch(() => {
      console.log('Ошибка удаления карточки на сервере');
    })
}

function enablePopupConfirmation() {
  popupConfirmationForm.addEventListener('submit', handleSubmitPopupConfirmation);
  popupConfirmationCloseButton.addEventListener('click', handleClosePopupByClickButton);
  popupConfirmation.addEventListener('mousedown', handleClosePopupByClickOverlay);
}

////// Server interaction

function setLocalProfile(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  avatar.style.backgroundImage = 'url("' + data.avatar + '")';
  myId = data._id;
}

function wipeLocalCards() {
  document.querySelectorAll('.card').forEach(card => {
    card.remove();
  });
}

function loadDataFromServer() {
  wipeLocalCards();
  loadDataFromServerRequest()
    .then(data => {
      setLocalProfile(data[0]);
      addCardsSet(data[1]);
    })
    .catch(() => {
      console.log('Ошибка загрузки данных с сервера');
    })
}


document.querySelectorAll('.popup').forEach(popup => enablePopupAnimation(popup));

enablePopupNewCard();
enablePopupProfile();
enablePopupImage();
enablePopupAvatar();
enablePopupConfirmation();

enableValidation(validationSettings);

loadDataFromServer();
