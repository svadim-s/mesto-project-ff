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
  createCard,
  likeCard,
  containerCard,
  deleteCard
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

const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardNameInput = popupCard.querySelector('.popup__input_type_card-name').value;
const urlInput = popupCard.querySelector('.popup__input_type_url').value;

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(profileForm.closest('.popup'));
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = cardNameInput.value;
  const linkValue = urlInput.value;

  const newCard = createCard({
    name: nameValue,
    link: linkValue
  }, deleteCard, likeCard, openImagePopup);
  containerCard.prepend(newCard);

  closePopup(popupCard.closest('.popup'));
  popupCardForm.reset();
}

popupCard.addEventListener('submit', handleCardFormSubmit);

function openImagePopup(imageURL, imageAlt, imageTitle) {
  popupPhoto.src = imageURL;
  popupPhoto.alt = imageAlt;
  popupImageTitle.textContent = imageTitle;
  openPopup(popupImage);
};

function renderCards(cardsData, deleteCallback) {
  cardsData.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCallback, likeCard, openImagePopup);
    containerCard.append(cardElement);
  });

  return containerCard;
}

renderCards(initialCards, deleteCard);