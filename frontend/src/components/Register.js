import { useState } from 'react';
import Section from "./Section";
import { Link } from "react-router-dom";

function Register({ onSignup }) {

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
        onSignup({ email, password });
    }

    return (
        <Section
            title="Регистрация"
            onSubmit={handleSubmt}
        >
            <input className="section__input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
            />
            <input className="section__input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handleChangePassword}
            />
            <button className="section__button">Зарегестрироваться</button>
            <p className="section__text">Уже зарегистрированы? <Link to='/sign-in' className="section__link">Войти</Link></p>
        </Section>
    )
}

export default Register;