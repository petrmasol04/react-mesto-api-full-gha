import React, { useCallback } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/Api';
import { authApi } from '../utils/AuthApi';
import '../index.css';
import AddPlacePopup from './AddPlacePopup ';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const navigate = useNavigate();

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      authApi
        .checkToken(token)
        .then(({ data }) => {
          setLoggedIn(true);
          setUserEmail(data.email)
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, [])

  React.useEffect(() => {
    tokenCheck();
    loggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData)
      }).catch((err) => {
        console.log(err);
      });
  }, [loggedIn])

  function handleLogout() {
    setLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  function handleRegister(data) {
    authApi
      .registerUser(data)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);
      });
  }

  function handleLogin(data) {
    authApi
      .loginUser(data)
      .then(({ token }) => {
        localStorage.setItem('token', token)
        setLoggedIn(true);
        setUserEmail(data.email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSuccess(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === newCard._id ? newCard : c));
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(dataPlace => {
        setCards([dataPlace, ...cards]);
        closeAllPopups()
      }).catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link, isOpen: true })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false })
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || isInfoTooltipOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header userEmail={userEmail} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <ProtectedRouteElement
            element={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />} />
        <Route path="/sign-up" element={<Register onSignup={handleRegister} />} />
        <Route path="/sign-in" element={<Login onSignin={handleLogin} />} />
      </Routes>

      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm
        title={'Вы уверены?'}
        name={'remove'}
        btnText={'Да'}
        isOpen={''}
      >
      </PopupWithForm>

      <InfoTooltip
        name
        isOpen={isInfoTooltipOpen}
        isSuccess={isInfoTooltipSuccess}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
