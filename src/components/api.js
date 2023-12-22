const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    authorization: '5abd209c-c0b0-45e6-8f17-fd20a6b8ecf1',
    'Content-Type': 'application/json'
  }
}

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const editProfile = (profileName, profileJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileJob
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const editProfileImage = (profileAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

const putLikeCard = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const deleteLikeCard = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
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