import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home as HomePage } from './pages/Home/Home.page';
import { Dashboard as ProfileDashboard } from './pages/Profile/Dashboard/Dashboard.page';
import { SignIn as SignInPage } from './pages/Authentication/SignIn/SignIn.page';

import Navbar from './components/Navigation/Navbar.component';
import Footer from './components/Footer/Footer.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route index element={<HomePage />} />
      <Route exact path='/signin' element={<SignInPage />} />
      <Route exact path='/profile'>
        <Route index element={<ProfileDashboard />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
);