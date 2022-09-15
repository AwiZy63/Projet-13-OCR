import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.style.css';
import { useForm } from 'react-hook-form';
import { defineUserDataAction } from '../../../store/userData/userData.actions';
import { connect } from 'react-redux';

function SignInPage({ userData, login }) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const credentials = {
            email: data.username,
            password: data.password
        }

        const result = await login(credentials);

        if (result?.error) {
            return setError("signinError", { message: result.message });
        } else {
            navigate('/profile');
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" {...register("username", { required: "Username is required" })} />
                        <pre>{errors.username?.message}</pre>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register("password", { required: "Password is required" })} />
                        <pre>{errors.password?.message}</pre>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <input onClick={() => clearErrors("signinError")} type='submit' className="sign-in-button" value={'Sign in'} />
                    <pre>{errors.signinError?.message}</pre>
                </form>
            </section>
        </main>
    )
}

const userDataState = (state) => {
    return {
        userData: state.userData
    }
}

const userDataDispatch = (dispatch) => {
    return {
        login: (credentials) => dispatch(defineUserDataAction(credentials))
    }
}

export default connect(userDataState, userDataDispatch)(SignInPage);