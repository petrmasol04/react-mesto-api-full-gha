import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__edit-avatar" onClick={onEditAvatar} />
                    <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__editor" onClick={onEditProfile} aria-label="Редактировать" />
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-mesto" onClick={onAddPlace} aria-label="Добавить место" />
                </div>
            </section>
            <section className="cards">
                <ul className="cards__container">{cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    )
                })}</ul>
            </section>
        </main >
    )
}

export default Main;
