import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import './Dashboard.style.css';
import { useState } from 'react';
import { editUserProfileAction } from '../../../store/userData/userData.actions';

function DashboardPage({ userData, updateIdentity }) {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const { register, handleSubmit, reset/*, formState: { errors } */ } = useForm();
    const { firstName, lastName, accessToken } = userData;

    const onSubmit = async (data) => {
        // console.log(data);
        reset();

        const identity = {
            firstName: data.firstName,
            lastName: data.lastName
        };

        const response = await updateIdentity({ identity: identity, token: accessToken });

        if (response?.error) {
            setIsEditProfileOpen(true);
            return;
        }
        setIsEditProfileOpen(false);
        return;
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditProfileOpen ?
                    <>
                        <h1>Welcome back<br /></h1>
                        <form className="edit-profile-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className='edit-profile-form-inputs'>
                                <div className="input-wrapper">
                                    <input tabIndex={1} placeholder={firstName} type="text" id="firstName" {...register("firstName", { required: "Firstname is required" })} />
                                    <button tabIndex={3} type='submit' className="sign-in-button edit-profile-button button-save">Save</button>
                                </div>
                                <div className="input-wrapper">
                                    <input tabIndex={2} placeholder={lastName} type="text" id="lastName" {...register("lastName", { required: "Lastname is required" })} />
                                    <button tabIndex={4} type='button' onClick={() => { reset(); setIsEditProfileOpen(false) }} className="sign-in-button edit-profile-button button-cancel">Cancel</button>
                                </div>
                            </div>

                        </form>
                    </>
                    :
                    <>
                        <h1>Welcome back<br />{firstName} {lastName}!</h1>
                        <button onClick={() => setIsEditProfileOpen(true)} className="edit-button">Edit Name</button>
                    </>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
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
        updateIdentity: (identity) => dispatch(editUserProfileAction(identity))
    }
}

export default connect(userDataState, userDataDispatch)(DashboardPage);