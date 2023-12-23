const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '5abd209c-c0b0-45e6-8f17-fd20a6b8ecf1',
    'Content-Type': 'application/json'
  }
}

const handleApiResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  }).then((res) => handleApiResponse(res))
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  }).then((res) => handleApiResponse(res))
}

const editProfile = (profileName, profileJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileJob
    })
  }).then((res) => handleApiResponse(res))
}

const editProfileImage = (profileAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  }).then((res) => handleApiResponse(res))
}

const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then((res) => handleApiResponse(res))
}

const putLikeCard = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  }).then((res) => handleApiResponse(res))
}

const deleteLikeCard = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then((res) => handleApiResponse(res))
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then((res) => handleApiResponse(res))
}

export {
  getUserData,
  getInitialCards,
  editProfile,
  editProfileImage,
  addNewCard,
  putLikeCard,
  deleteLikeCard,
  deleteCard
}