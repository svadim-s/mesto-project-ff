import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal";
import {
  createCard,
  likeCard,
  containerCard,
} from '../components/card'
import {
  enableValidation,
  clearValidation
} from '../components/validation'
import {
  getUserData,
  getInitialCards,
  editProfile,
  editProfileImage,
  addNewCard,
  deleteCard
} from '../components/api'

const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const popupProfileButton = document.querySelector(".profile__edit-button");

const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const popupProfileImageButton = popupAvatar.querySelector(".popup__button");
const urlAvatar = popupAvatar.querySelector(".popup__input_type_url");

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
const profileImage = document.querySelector('.profile__image');

const cardNameInput = popupCard.querySelector('.popup__input_type_card-name');
const urlInput = popupCard.querySelector('.popup__input_type_url');

const popupDeleteConfirm = document.querySelector(".popup_type_delete-confirm");
const popupDeleteConfirmButton = popupDeleteConfirm.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = "";

popupProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(popupProfileForm, validationConfig);
  openPopup(popupProfile);
});

popupCardButton.addEventListener('click', () => {
  clearValidation(popupCard, validationConfig);
  openPopup(popupCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOverlay);
  popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupProfile.querySelector('.popup__button'));

  editProfile(nameInput.value, jobInput.value)
    .then(res => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closePopup(profileForm.closest('.popup'));
    })
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, popupProfile.querySelector('.popup__button')));
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupCard.querySelector('.popup__button'));

  addNewCard(cardNameInput.value, urlInput.value)
    .then(card => {
      const newCard = createCard(card, userId, deleteCardPopup, likeCard, openImagePopup);
      containerCard.prepend(newCard);

      closePopup(popupCard.closest('.popup'));
      popupCardForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, popupCard.querySelector('.popup__button')));
}

popupCard.addEventListener('submit', handleCardFormSubmit);

function openImagePopup(imageURL, imageAlt, imageTitle) {
  popupPhoto.src = imageURL;
  popupPhoto.alt = imageAlt;
  popupImageTitle.textContent = imageTitle;
  openPopup(popupImage);
};

profileImage.addEventListener('click', () => {
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

function handleProfileImageSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupProfileImageButton);

  editProfileImage(urlAvatar.value)
    .then(res => {
      profileImage.style = `background-image: url('${res.avatar}')`;

      closePopup(popupAvatar);
      popupAvatarForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => renderSaving(false, popupProfileImageButton));
};

popupAvatar.addEventListener('submit', handleProfileImageSubmit);

function renderSaving(isSaving, button) {
  button.textContent = isSaving ? 'Сохранение...' : 'Сохранить';
}

function deleteCardPopup(cardId) {
  openPopup(popupDeleteConfirm);
  popupDeleteConfirmButton.dataset.cardId = cardId;
}

function handleDeleteCardConfirm(evt) {
  evt.preventDefault();

  const cardId = popupDeleteConfirmButton.dataset.cardId;

  deleteCard(cardId)
    .then(() => {
      const deleteCard = document.querySelector(`.places__item[data-id="${cardId}"]`);

      deleteCard.remove();
      popupDeleteConfirmButton.dataset.cardId = "";
      closePopup(popupDeleteConfirm);
    }).catch(err => console.log(err));
}

popupDeleteConfirmButton.addEventListener('click', handleDeleteCardConfirm);

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData["_id"];

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style = `background-image: url('${userData.avatar}')`;

    initialCards.forEach((card) => {
      const cardElement = createCard(card, userId, deleteCardPopup, likeCard, openImagePopup);
      containerCard.append(cardElement);
    })
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);