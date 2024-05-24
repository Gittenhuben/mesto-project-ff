const token = '2763cd9f-9006-409d-8ad3-ee41bf99bf04';
const serverProfileLink = 'https://nomoreparties.co/v1/wff-cohort-15/users/me';
const serverCardsLink = 'https://nomoreparties.co/v1/wff-cohort-15/cards';
const serverLikesLink = serverCardsLink + '/likes';
const serverAvatarLink = serverProfileLink + '/avatar';

const headers = {
  authorization: token,
  'Content-Type': 'application/json'
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

function getFromServer(link) {
  return fetch(link, {
    headers: headers,
  })
    .then(res => getResponseData(res))
    .catch(err => {
      console.log('Ошибка загрузки данных с сервера');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

export function loadDataFromServerRequest() {
  return Promise.all([getFromServer(serverProfileLink), getFromServer(serverCardsLink)])
}

export function updateServerProfile(name, about) {
  return fetch(serverProfileLink, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => getResponseData(res))
    .catch(err => {
      console.log('Ошибка выгрузки профиля на сервер');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

export function uploadCard(cardData) {
  return fetch(serverCardsLink, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(cardData)
  })
    .then(res => getResponseData(res))
    .then(cardData => cardData._id)
    .catch(err => {
      console.log('Ошибка выгрузки карточки на сервер');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

export function deleteCardOnServer(cardId) {
  return fetch(serverCardsLink + '/' + cardId, {
    method: 'DELETE',
    headers: headers
  })
    .then(res => getResponseData(res))
    .catch(err => {
      console.log('Ошибка удаления карточки на сервере');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

export function sendLikeToServer(cardId, like) {
  let method;
  if (like) {
    method = 'PUT';
  } else {
    method = 'DELETE';
  }
  
  return fetch(serverLikesLink + '/' + cardId, {
    method: method,
    headers: headers
  })
    .then(res => getResponseData(res))
    .catch(err => {
      console.log('Ошибка отправки лайка на сервер');
      return Promise.reject(`Ошибка: ${err}`);
    })
}

export function updateServerAvatar(link) {
  return fetch(serverAvatarLink, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => getResponseData(res))
    .catch(err => {
      console.log('Ошибка выгрузки аватара на сервер');
      return Promise.reject(`Ошибка: ${err}`);
    })
}
