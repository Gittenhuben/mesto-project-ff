import { sendLikeToServer } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function handleClickLike(evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.imageId
  const oldLikeStatus = evt.target.classList.contains('card__like-button_is-active');
  const cardLikesCounter = card.querySelector('.card__likes_counter');
  
  sendLikeToServer(cardId, !oldLikeStatus)
    .then(cardData => {
      evt.target.classList.toggle('card__like-button_is-active');
      if (cardData.likes) cardLikesCounter.textContent = cardData.likes.length || 0;
    })
    .catch(() => {
      console.log('Ошибка отправки лайка на сервер');
    })
}

export function createCard(cardData, onDeleteCard, onClickImage, onClickLike, myId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikesCounter = cardElement.querySelector('.card__likes_counter');
  const cardAvatar = cardElement.querySelector('.card__avatar');
  const cardAvatarText = cardElement.querySelector('.card__avatar-text');

  cardDeleteButton.addEventListener('click', onDeleteCard);
  cardLikeButton.addEventListener('click', onClickLike);
  cardImage.addEventListener('click', () => onClickImage(cardData.link, cardData.name));
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardElement.dataset.imageId = cardData._id || 0;
  
  if (cardData.likes) {
    cardLikesCounter.textContent = cardData.likes.length || 0;
    if (cardData.likes.some(like => like._id === myId)) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  } else {
    cardLikesCounter.textContent = 0;
  }
  
  if (cardData.owner) {
    if (cardData.owner._id !== myId) cardDeleteButton.remove();
    cardAvatar.style.backgroundImage = "url('" + cardData.owner.avatar + "')";
    cardAvatarText.textContent = cardData.owner.name;
    cardAvatar.addEventListener('click', () =>
      onClickImage(cardData.owner.avatar, cardData.owner.name + "\n(" + cardData.owner.about + ")"));
    cardAvatarText.addEventListener('click', () =>
      onClickImage(cardData.owner.avatar, cardData.owner.name + "\n(" + cardData.owner.about + ")"));


  } else {
    cardDeleteButton.remove();
  }

  return cardElement;
}
