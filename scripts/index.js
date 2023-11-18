function createCard(cardData, deleteCallback) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  cardElement.querySelector('.card__delete-button').addEventListener('click', (e) => {
    deleteCallback(e.target);
  })

  return cardElement;
}

function deleteCard(cardElement) {
  const cardItem = cardElement.closest('.places__item');
  cardItem.remove();
}

function renderCards(cardsData, deleteCallback) {
  const containerCard = document.querySelector('.places__list');

  cardsData.forEach(cardData => {
    let cardElement = createCard(cardData, deleteCallback);
    containerCard.append(cardElement);
  });

  return containerCard;
}

renderCards(initialCards, deleteCard);