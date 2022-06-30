class MoviesApi {
  constructor({ address }) {
    this._address = address;
  }

  getMovies() {
    return fetch(`${this._address}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)

      })
  }
}

const moviesApi = new MoviesApi({
  address: 'https://api.nomoreparties.co'
});
export default moviesApi;