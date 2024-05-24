const token = '2763cd9f-9006-409d-8ad3-ee41bf99bf04';
const serverProfileLink = 'https://nomoreparties.co/v1/wff-cohort-15/users/me';
const serverCardsLink = 'https://nomoreparties.co/v1/wff-cohort-15/cards';
const serverLikesLink = serverCardsLink + '/likes';
const serverAvatarLink = serverProfileLink + '/avatar';


function getFromServer(link) {
  return fetch(link, {
    headers: {
      authorization: token,
    }
  })
}

export function loadDataFromServerRequest() {
  return Promise.all([getFromServer(serverProfileLink), getFromServer(serverCardsLink)])
    .then(responses => Promise.all(responses.map(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })))
}

export function updateServerProfileRequest(name, about) {
  return fetch(serverProfileLink, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (!res.ok) return Promise.reject();
    })
}

export function uploadCardRequest(cardData) {
  return fetch(serverCardsLink, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cardData)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    })
}

export function deleteCardOnServerRequest(cardId) {
  return fetch(serverCardsLink + '/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  })
    .then(res => {
      if (!res.ok) return Promise.reject();
    })
}

export function sendLikeToServerRequest(cardId, like) {
  let method;
  if (like) {
    method = 'PUT';
  } else {
    method = 'DELETE';
  }
  
  return fetch(serverLikesLink + '/' + cardId, {
    method: method,
    headers: {
      authorization: token,
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject();
      }
    }) 
}

function checkLink(link) {
  return fetch(link, {
      method: 'HEAD',
    })
      .then(res => {
        if (!res.ok || !res.headers.get('Content-Type').includes('image')) {
          console.log('Ошибка: некорректная ссылка');
          return Promise.reject();
        }
      })
      .catch(() => {
        console.log('Ошибка проверки ссылки');
        return Promise.reject();
      })
}

export function updateServerAvatarRequest(link) {
  return checkLink(link)
    .then(() => {    
      return fetch(serverAvatarLink, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: link
        })
      })
    })  
    .then(res => {
      if (!res.ok) return Promise.reject();
    })
}
