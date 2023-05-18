const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const apiConfig = {
    baseUrl: 'https://api.mesto.world.nomoredomains.monster',
    headers: {
        'Content-Type': 'application/json'
    }
}

export { config, apiConfig };