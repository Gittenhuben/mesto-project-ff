function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.card').remove();
}

function prepareCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardDeleteButton.addEventListener('click', deleteCard);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

function loadCards(cardsSet) {
  const cardsList = document.querySelector('.places__list');
  cardsSet.forEach((cardData) => {
    cardsList.append(prepareCard(cardData, deleteCard))
  })
}

loadCards(initialCards);
