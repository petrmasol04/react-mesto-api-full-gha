import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [nameCard, setNameCard] = React.useState('')
    const [linkCard, setLinkCard] = React.useState('')

    React.useEffect(() => {
        setNameCard('');
        setLinkCard('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: nameCard,
            link: linkCard,
        });
    }

    function handleChangeNameCard(e) {
        setNameCard(e.target.value);
    }

    function handleChangeLinkCard(e) {
        setLinkCard(e.target.value);
    }

    return (
        <PopupWithForm
            title={'Новое место'}
            name={'place'}
            btnText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onAddPlace={onAddPlace}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_place"
                id="place"
                name="name"
                required
                type="text"
                placeholder="Название"
                autoComplete="off"
                minLength={2}
                maxLength={30}
                onChange={handleChangeNameCard}
                value={nameCard || ''}
            />
            <span className="popup__error" id="place-error" />
            <input
                className="popup__input popup__input_place"
                id="url"
                name="link"
                required
                type="url"
                placeholder="Сылка на картинка"
                autoComplete="off"
                onChange={handleChangeLinkCard}
                value={linkCard || ''}
            />
            <span className="popup__error" id="url-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;