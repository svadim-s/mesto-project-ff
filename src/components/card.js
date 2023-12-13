import {
  openImagePopup
} from '../scripts/index'

const cardsTemplate = document.querySelector('#card-template').content;
const containerCard = document.querySelector('.places__list');

function createCard(cardData, deleteCallback, likeCardCallback, imageClickCallback) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;

  cardElement.querySelector('.card__delete-button').addEventListener('click', (e) => {
    deleteCallback(e.target);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton);
  });

  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = cardData.link;
  imageElement.textContent = cardData.name;
  imageElement.addEventListener('click', () => imageClickCallback(cardData.link, cardData.name));

  return cardElement;
}

function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
}

function renderCards(cardsData, deleteCallback) {
  cardsData.forEach(cardData => {
    let cardElement = createCard(cardData, deleteCallback, likeCard, openImagePopup);
    containerCard.append(cardElement);
  });

  return containerCard;
}

export {
  renderCards,
  likeCard,
  createCard,
  containerCard
}