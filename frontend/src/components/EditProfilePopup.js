import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about
        });
    }

    return (
        <PopupWithForm
            title={'Редактировать профиль'}
            name={'profile'}
            btnText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_profile"
                id="name"
                name="name"
                required
                type="text"
                placeholder="Имя"
                autoComplete="off"
                minLength={2}
                maxLength={40}
                onChange={handleChangeName}
                value={name || ''}
            />

            <span className="popup__error" id="name-error"> </span>
            <input
                className="popup__input popup__input_profile"
                id="description"
                name="about"
                required
                type="text"
                placeholder="Вид деятельности"
                autoComplete="off"
                minLength={2}
                maxLength={200}
                onChange={handleChangeAbout}
                value={about || ''}
            />

            <span className="popup__error" id="description-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;