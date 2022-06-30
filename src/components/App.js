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
import moviesApi from '../utils/MoviesApi';
import * as Auth from '../utils/Auth';
import mainApi from '../utils/MainApi';

function App() {

  const savedMovies = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ];

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedInn, setLoggedInn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          setLoggedInn(true);
          console.log("I have just changed loggedInn to TRUE:", isLoggedInn);
        })
        .catch(err => {
          setIsSuccess(false);
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
      moviesApi.getMovies()
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch(err => {
          console.log(err);
        })
      moviesApi.getMovies()
        .then((res) => {
          setMovies(
            res
          )
        })
        .catch(err => {
          console.log(err);
        })

    }
  }, [])

  useEffect(() => {
    moviesApi.getMovies()
      .then((res) => {
        setMovies(res);
      })
  }, [])

  function handleRegister({ name, email, password }) {
    Auth.register({ name, email, password })
      .then(() => {
        setIsSuccess(true);
        navigate('/signin');
        handleLogin({ email, password })
      })
      .catch((err) => {
        setIsSuccess(false);
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
        setIsSuccess(false);
        if (err.status === 400) {
          console.log('400 - не передано одно из полей');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден');
        }
      });
  }

  function handleSearchMovies(text) {
    const findedMovies = searchMovies(movies, text);
    setFilteredMovies(findedMovies);
  }

  function searchMovies(moviesList, searchText) {
    let allMovies = [];
    moviesList.filter((movie) => {
      if (movie.nameRu.contains(searchText)) {
        allMovies.push(movie);
      }
    })
    return allMovies;
  }

  return (
    <div className="App">
      <Routes>

        <Route exact path="/"
          element={<
            Main 
            isLoggedInn={isLoggedInn}
            />}
        />

        <Route path="/movies"
          element={
            <Movies
              movies={movies}
              handleSearchMovies={handleSearchMovies}
            />
          }
        />

        <Route path="/saved-movies"

          element={
            <SavedMovies
              savedMovies={savedMovies}
              isSaved={true}
            />
          }
        />

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

        <Route path="/profile"
          element={<Profile />}
        />

        <Route path="*"
          element={<NotFound />}
        />

      </Routes>
    </div >
  );
}

export default App;
