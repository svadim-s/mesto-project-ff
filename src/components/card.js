import {
  putLikeCard,
  deleteLikeCard,
} from '../components/api'

const cardsTemplate = document.querySelector('#card-template').content;
const containerCard = document.querySelector('.places__list');

function createCard(cardData, userId, deleteCallback, likeCardCallback, imageClickCallback) {
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  const cardLikeCounter = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  cardElement.dataset.id = cardData._id;

  if (cardData.owner._id === userId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', (e) => {
      deleteCallback(cardData._id);
    });
  } else {
    cardElement.querySelector('.card__delete-button').remove()
  }

  if (checkUserLike(cardData, userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeCardCallback(cardData, userId, cardElement, likeButton);
  });

  imageElement.addEventListener('click', () => imageClickCallback(cardData.link, cardData.name, cardData.name));

  return cardElement;
}

function likeCard(card, userId, cardElement, btn) {
  const likeCounter = cardElement.querySelector(".card__like-count");

  if (checkUserLike(card, userId)) {
    deleteLikeCard(card._id)
      .then(res => {
        btn.classList.remove('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
        card.likes = res.likes;
      })
      .catch(err => console.log(err));

  } else {
    putLikeCard(card._id)
      .then(res => {
        btn.classList.add('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
        card.likes = res.likes;
      })
      .catch(err => console.log(err));
  }
}

function checkUserLike(card, userId) {
  return card.likes.some(like => like._id === userId);
}

export {
  likeCard,
  createCard,
  containerCard,
}