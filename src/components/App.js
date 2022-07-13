import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../App.css';
import Main from './Main';
import Movies from './Movies';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import SavedMovies from './SavedMovies';
import NotFound from './NotFound';
import * as Auth from '../utils/Auth';
import mainApi from '../utils/MainApi';
import moviesApi from '../utils/MoviesApi';
import { CurrentUserContext } from '../context/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [movies, setMovies] = useState([]);
  const [moviesOnPage, setMoviesOnPage] = useState([]);
  const [isLoggedInn, setLoggedInn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesOnPage, setSavedMoviesOnPage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // const movies = JSON.parse(localStorage.getItem('movies'));

    // setMoviesOnPage(movies);

    if (token) {
      Auth.getContent(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedInn(true);
        })
        .catch(err => {
          console.log(err);
          if (err.status === 401) {
            console.log('401 — Токен не передан или передан не в том формате');
          }
          console.log('401 — Переданный токен некорректен');
        })
    }
  }, [])

  useEffect(() => {
    if (isLoggedInn === true) {
      mainApi.setToken(localStorage.getItem('jwt'));
      mainApi.getProfileInfo()
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch(err => {
          console.log(err);
        })

      moviesApi.getMovies()
        .then((res) => {
          setMovies(res);
        })
        .catch(err => {
          console.log(err);
        })

      mainApi.getSavedMovies()
        .then((res) => {
          const newSavedMovies = res.data.filter((m) => m.owner === currentUser._id);
          // console.log(newSavedMovies);
          setSavedMoviesOnPage(newSavedMovies);
          setSavedMovies(newSavedMovies);
        })
        .catch(err => {
          console.log(err);
        })

    }
  }, [isLoggedInn])

  function handleRegister({ name, email, password }) {
    Auth.register({ name, email, password })
      .then(() => {
        navigate('/signin');
        handleLogin({ email, password })
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей');
        }
      })
  }

  function handleLogin({ email, password }) {
    Auth.authorize({ email, password })
      .then((data) => {
        Auth.getContent(data.token)
          .then((res) => {

            mainApi.setToken(data.token);
            setLoggedInn(true);
            navigate('/');
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          console.log('400 - не передано одно из полей');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден');
        }
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchText');
    localStorage.removeItem('filterCheckbox');
    localStorage.removeItem('savedMovies');
    setLoggedInn(false);
    navigate('/login');
  }

  function changeUserInfo({ name, email }) {
    mainApi.editProfileInfo({ name, email })
      .then((user) => {
        setCurrentUser({ name: user.name, email: user.email })
      })
      .catch(err => {
        console.log(err);
      })
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMoviesOnPage([res, ...savedMoviesOnPage]);
        setSavedMovies([res, ...savedMovies]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function deleteMovie(movieId) {
    console.log(movieId)
    mainApi.deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((m) => {
          return m._id !== movieId;
        });
        setSavedMovies(newSavedMovies);
        setSavedMoviesOnPage(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      })
  }

  function handleFilterMovies(isFiltered) {
    const filteredMovies = moviesOnPage.filter((movie) => movie.duration <= 40);
    console.log(moviesOnPage);
    setMoviesOnPage(filteredMovies);
    // localStorage.setItem('movies', JSON.stringify(filteredMovies));
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    console.log(isFiltered);
  }

  function handleUnfilterMovies(isFiltered) {
    const moviesFromStorage = JSON.parse(localStorage.getItem('movies'));
    setMoviesOnPage(moviesFromStorage);
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    localStorage.setItem('movies', JSON.stringify(moviesFromStorage));
    console.log(isFiltered);
  }

  function handleFilterSavedMovies() {
    const filteredMovies = savedMovies.filter((movie) => movie.duration <= 40);
    setSavedMoviesOnPage(filteredMovies);
  }

  function handleUnfilterSavedMovies() {
    setSavedMoviesOnPage(savedMovies);
  }

  function handleSearchMovies(searchText) {
    const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    setMoviesOnPage(filteredMovies);
    console.log(filteredMovies);
    console.log(movies);
    localStorage.setItem('movies', JSON.stringify(filteredMovies));
    localStorage.setItem('searchText', JSON.stringify(searchText));
  }

  function handleSearchSavedMovies(searchText) {
    const filteredMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    setSavedMoviesOnPage(filteredMovies);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App" >
        <Routes>

          <Route exact path="/"
            element={
              <Main
                isLoggedInn={isLoggedInn}
              />
            } />

          <Route path="/movies"
            element={
              <ProtectedRoute loggedIn={localStorage.getItem('jwt')} >
                <Movies
                  movies={moviesOnPage}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                  handleFilterMovies={handleFilterMovies}
                  handleUnfilterMovies={handleUnfilterMovies}
                  handleSearchMovies={handleSearchMovies}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            } />

          <Route path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={localStorage.getItem('jwt')} >
                <SavedMovies
                  isSaved={true}
                  savedMovies={savedMoviesOnPage}
                  deleteMovie={deleteMovie}
                  handleFilterMovies={handleFilterSavedMovies}
                  handleUnfilterMovies={handleUnfilterSavedMovies}
                  handleSearchSavedMovies={handleSearchSavedMovies}
                  isLoading={isLoading}
                />
              </ProtectedRoute >
            } />

          <Route path="/profile"
            element={

              <ProtectedRoute loggedIn={localStorage.getItem('jwt')} >
                <Profile
                  signOut={signOut}
                  changeUserInfo={changeUserInfo}
                />
              </ProtectedRoute >
            } />

          <Route path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
              />}
          />

          <Route path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
              />}
          />

          <Route path="*"
            element={<NotFound />}
          />

        </Routes>
      </div >
    </ CurrentUserContext.Provider >
  );
}

export default App;
