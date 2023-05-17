const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '0f48b666-db42-4018-a738-6a84dc7b3522',
        'Content-Type': 'application/json'
    }
}

export { config, apiConfig };