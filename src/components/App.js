import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
  const [isUpdated, setIsUpdated] = useState(false);
  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isNotFoundInSaved, setIsNotFoundInSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    const filterCheckbox = JSON.parse(localStorage.getItem('filterCheckbox'));
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    const movies = JSON.parse(localStorage.getItem('movies'));

    if (filterCheckbox === true) {
      setMoviesOnPage(filteredMovies);
    } else if (filterCheckbox === false) {
      setMoviesOnPage(movies);
    } else {
      setMoviesOnPage([])
    }

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

          mainApi.getSavedMovies()
            .then((res) => {
              const newSavedMovies = res.data.filter((m) => m.owner === currentUser._id);
              localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
              setSavedMoviesOnPage(newSavedMovies);
              setSavedMovies(newSavedMovies);
            })
            .catch(err => {
              console.log(err);
            })

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
        setRegisterError(true);
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
            navigate('/movies');
            localStorage.setItem('movies', JSON.stringify([]));
            localStorage.setItem('searchText', JSON.stringify(''));
            localStorage.setItem('filterCheckbox', JSON.stringify(false));
            localStorage.setItem('savedMovies', JSON.stringify([]));
          });
      })
      .catch((err) => {
        console.log(err);
        setLoggedInn(false);
        setLoginError(true);
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
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('searchText');
    localStorage.removeItem('filterCheckbox');
    localStorage.removeItem('savedMovies');
    setMoviesOnPage([]);
    setSavedMoviesOnPage([]);
    setLoggedInn(false);
  }

  function changeUserInfo({ name, email }) {
    mainApi.editProfileInfo({ name, email })
      .then((user) => {
        setCurrentUser({ name: user.name, email: user.email });
        setIsUpdatedSuccessfully(true);
        setIsUpdated(true);
      })
      .catch(err => {
        console.log(err);
        setIsUpdatedSuccessfully(false);
        setIsUpdated(true);
      })
  }

  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMoviesOnPage([res, ...savedMoviesOnPage]);
        setSavedMovies([res, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify([res, ...savedMovies]));
      })
      .catch(err => {
        console.log(err);
      })
  }

  function deleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((m) => {
          return m._id !== movieId;
        });
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        setSavedMovies(newSavedMovies);
        setSavedMoviesOnPage(newSavedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      })
  }

  function handleFilterMovies(isFiltered) {
    const filteredMovies = moviesOnPage.filter((movie) => movie.duration <= 40);
    setMoviesOnPage(filteredMovies);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    if (filteredMovies.length > 0) {
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }
  }

  function handleUnfilterMovies(isFiltered) {
    const moviesFromStorage = JSON.parse(localStorage.getItem('movies'));
    setMoviesOnPage(moviesFromStorage);
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    localStorage.setItem('movies', JSON.stringify(moviesFromStorage));
    setIsNotFound(false);
  }

  function handleFilterSavedMovies(isFiltered) {
    const filteredMovies = savedMovies.filter((movie) => movie.duration <= 40);
    setSavedMoviesOnPage(filteredMovies);
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    if (filteredMovies.length > 0) {
      setIsNotFoundInSaved(false);
    } else {
      setIsNotFoundInSaved(true);
    }

  }

  function handleUnfilterSavedMovies(isFiltered) {
    setSavedMoviesOnPage(savedMovies);
    localStorage.setItem('filterCheckbox', JSON.stringify(isFiltered));
    setIsNotFoundInSaved(false);
  }

  function handleSearchMovies(searchText) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
        setIsLoading(false);
        const filteredMovies = res.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        setMoviesOnPage(filteredMovies);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        if (filteredMovies.length > 0) {
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
    localStorage.setItem('searchText', JSON.stringify(searchText));
    localStorage.setItem('filterCheckbox', JSON.stringify(false));
  }

  function handleSearchSavedMovies(searchText) {
    const filteredMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    setSavedMoviesOnPage(filteredMovies);
    if (filteredMovies.length > 0) {
      setIsNotFoundInSaved(false);
    } else {
      setIsNotFoundInSaved(true);
    }
  }

  useEffect(() => {
    setIsUpdatedSuccessfully(false);
    setIsUpdated(false);
    setLoggedInn(false);
  }, [])

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
                  moviesOnPage={moviesOnPage}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  handleFilterMovies={handleFilterMovies}
                  handleUnfilterMovies={handleUnfilterMovies}
                  handleSearchMovies={handleSearchMovies}
                  isLoading={isLoading}
                  savedMovies={savedMoviesOnPage}
                  isNotFound={isNotFound}
                />
              </ProtectedRoute>
            } />

          <Route path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={localStorage.getItem('jwt')} >
                <SavedMovies
                  isNotFound={isNotFoundInSaved}
                  isSaved={true}
                  savedMovies={savedMoviesOnPage}
                  deleteMovie={deleteMovie}
                  handleFilterMovies={handleFilterSavedMovies}
                  handleUnfilterMovies={handleUnfilterSavedMovies}
                  handleSearchSavedMovies={handleSearchSavedMovies}
                />
              </ProtectedRoute >
            } />

          <Route path="/profile"
            element={

              <ProtectedRoute loggedIn={localStorage.getItem('jwt')} >
                <Profile
                  signOut={signOut}
                  changeUserInfo={changeUserInfo}
                  isUpdatedSuccessfully={isUpdatedSuccessfully}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                />
              </ProtectedRoute >
            } />

          <Route path="/signup"
            element={
              isLoggedInn === true ?
                <Navigate to='/' />
                :
                <Register
                  handleRegister={handleRegister}
                  registerError={registerError}
                />}
          />

          <Route path="/signin"
            element={
              isLoggedInn === true ?
                <Navigate to='/' />
                :
                <Login
                  handleLogin={handleLogin}
                  setLoggedInn={setLoggedInn}
                  loginError={loginError}
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
