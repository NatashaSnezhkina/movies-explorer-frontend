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
    return fetch(`${this._address}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    })
      .then(this._responseProcessing())
  }

  editProfileInfo({ name, email }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
      .then(this._responseProcessing())
  }

  saveMovie(movie) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify({
        country: movie.country || 'country',
        director: movie.director || '-',
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || '-',
      })
    }).then(this._responseProcessing());
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._responseProcessing())
  }

  deleteMovie(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      },
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