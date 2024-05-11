import { handleDeleteCard, handleClickImage, handleClickLike } from './index.js';

function createCard(cardData, onDelete, onClickImage, onClickLike) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardDeleteButton.addEventListener('click', onDelete);
  cardLikeButton.addEventListener('click', onClickLike);
  cardImage.addEventListener('click', onClickImage);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

function addCard(cardData, prepend = false) {
  const cardsList = document.querySelector('.places__list');
  const newCard = createCard(cardData, handleDeleteCard, handleClickImage, handleClickLike);
  if (prepend) {
    cardsList.prepend(newCard);
  } else {
    cardsList.append(newCard);
  }
}

export function addCardFromPopup() {
  const popup = document.querySelector('.popup_type_new-card');
  const inputName = popup.querySelector('input[name="place-name"]');
  const inputLink = popup.querySelector('input[name="link"]');

  const cardData = {};
  cardData.name = inputName.value;
  cardData.link = inputLink.value;

  addCard(cardData, true);
}

export function addCardsSet(cardsSet) {
  cardsSet.forEach(cardData => {
    addCard(cardData);
  });
}
