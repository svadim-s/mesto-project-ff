import "../pages/index.css";
import {
  initialCards
} from "./cards";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal";
import {
  renderCards,
  createCard,
  likeCard,
  containerCard
} from '../components/card'

const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileButton = document.querySelector(".profile__edit-button");

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardForm = document.forms["new-place"];
const popupCardButton = document.querySelector(".profile__add-button");

const popupImage = document.querySelector('.popup_type_image');
const popupPhoto = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption')

const popups = document.querySelectorAll('.popup');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

popupProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});

popupCardButton.addEventListener('click', () => {
  openPopup(popupCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOverlay);
  popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup));
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(formElement.closest('.popup'));
}

formElement.addEventListener('submit', handleFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = popupCard.querySelector('.popup__input_type_card-name').value;
  const linkValue = popupCard.querySelector('.popup__input_type_url').value;

  const newCard = createCard({
    name: nameValue,
    link: linkValue
  }, deleteCard, likeCard, openImagePopup);
  containerCard.prepend(newCard);

  closePopup(popupCard.closest('.popup'));
  popupCardForm.reset();
}

popupCard.addEventListener('submit', handleCardFormSubmit);

export const openImagePopup = (imageURL, imageTitle) => {
  popupPhoto.src = imageURL;
  popupImageTitle.textContent = imageTitle;
  openPopup(popupImage);
};

function deleteCard(cardElement) {
  const cardItem = cardElement.closest('.places__item');
  cardItem.remove();
}

renderCards(initialCards, deleteCard);