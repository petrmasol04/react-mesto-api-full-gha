import { useState } from 'react';
import Section from "./Section";

function Login({ onSignin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmt(e) {
        e.preventDefault();
        onSignin({ email, password });
    }

    return (
        <Section
            title="Вход"
            onSubmit={handleSubmt}
        >
            <input className="section__input"
                type="email"
                placeholder="Email"
                onChange={handleChangeEmail}
            />
            <input className="section__input"
                type="password"
                placeholder="Пароль"
                onChange={handleChangePassword}
            />
            <button className="section__button">Войти</button>
        </Section >
    )
}

export default Login;