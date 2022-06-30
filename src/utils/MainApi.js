class MainApi {
  constructor({ address }) {
    this._address = address;
  }

  _responseProcessing() {
    return (res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
  }

  getProfileInfo() {
    // console.log(this._token);
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    })
      .then(this._responseProcessing())
  }

  sendProfileInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._responseProcessing())
  }

  setToken(token) {
    localStorage.setItem('jwt', token);
    this._token = token;
  }

}

const mainApi = new MainApi({
  address: 'https://api.diploma.natasha.snezh.nomoreparties.sbs',
});

export default mainApi;