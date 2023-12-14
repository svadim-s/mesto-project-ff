const cardsTemplate = document.querySelector('#card-template').content;
const containerCard = document.querySelector('.places__list');

function createCard(cardData, deleteCallback, likeCardCallback, imageClickCallback) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', (e) => {
    deleteCallback(e.target);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton);
  });

  cardElement.addEventListener('click', () => imageClickCallback(cardData.link, cardData.name, cardData.name));

  return cardElement;
}

function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
}

function deleteCard(cardElement) {
  const cardItem = cardElement.closest('.places__item');
  cardItem.remove();
}

export {
  likeCard,
  createCard,
  containerCard,
  deleteCard
}