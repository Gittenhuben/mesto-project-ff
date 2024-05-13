const cardTemplate = document.querySelector('#card-template').content;


export function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}

export function handleClickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function createCard(cardData, onDeleteCard, onClickImage, onClickLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardDeleteButton.addEventListener('click', onDeleteCard);
  cardLikeButton.addEventListener('click', onClickLike);
  cardImage.addEventListener('click', () => onClickImage(cardData.link, cardData.name));

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}
