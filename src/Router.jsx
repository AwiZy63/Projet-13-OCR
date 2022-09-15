import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home as HomePage } from './pages/Home/Home.page';
import DashboardPage from './pages/Profile/Dashboard/Dashboard.page';
import SignInPage from './pages/Authentication/SignIn/SignIn.page';

import Navbar from './components/Navigation/Navbar.component';
import Footer from './components/Footer/Footer.component';
import { connect } from 'react-redux';

function AppRouter({ userData }) {
    const { isLogged } = userData;
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route index element={<HomePage />} />
                {isLogged ?
                    <Route exact path='/profile'>
                        <Route index element={<DashboardPage />} />
                    </Route>
                    :
                    <Route exact path='/signin' element={<SignInPage />} />
                }
                <Route path='*' element={<Navigate to={'/'} replace />} />
            </Routes>
            <Footer />
        </Router>
    )
}

const userDataState = (state) => {
    return {
        userData: state.userData
    }
}

export default connect(userDataState)(AppRouter)