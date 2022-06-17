import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import Main from './Main';
import Movies from './Movies';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import SavedMovies from './SavedMovies';
import NotFound from './NotFound';

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

  return (
    <div className="App">
      <Routes>

        <Route exact path="/"
          element={<Main />}
        />

        <Route path="/movies"
          element={<Movies />}
        />

        <Route path="/saved-movies"

          element={
            <SavedMovies
              savedMovies={savedMovies}
            />
          }
        />

        <Route path="/signup"
          element={<Register />}
        />

        <Route path="/signin"
          element={<Login />}
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
