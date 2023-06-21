import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import './scss/app.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Subscribe from './pages/Subscribe/Subscribe';
import { AppProvider } from './AppContext';

const App: React.FC = () => {
  const preferedLang = localStorage.getItem('preferedLang')
  // const localLang = preferedLang ? preferedLang : navigator.language.startsWith('es') ? 'es' : 'en'
  const localLang = 'es' // hardcoded for now
  const isMobile = window.screen.width <= 768
  const [search, setSearch] = useState<string[]>([])
  const [lang, setLang] = useState<string>(localLang)

  return (
    <AppProvider lang={lang} setLang={setLang} search={search} setSearch={setSearch} isMobile={isMobile}>
      <Switch>
        <Route exact path="/">
          <div className='page__wrapper'>
            <Home />
            <Footer />
          </div>
        </Route>

        <Route path="/privacyPolicy">
          <div className='page__wrapper'>
            <Header />
            <PrivacyPolicy />
            <Footer />
          </div>
        </Route>

        <Route path="/about">
          <div className='page__wrapper'>
            <Header />
            <About />
            <Footer />
          </div>
        </Route>

        <Route path="/contact">
          <div className='page__wrapper'>
            <Header />
            <Contact />
            <Footer />
          </div>
        </Route>

        <Route path="/login">
          <div className='page__wrapper'>
            <Header />
            <Login />
            <Footer />
          </div>
        </Route>
        
        <Route path="/subscribe">
          <div className='page__wrapper'>
            <Header />
            <Subscribe />
            <Footer />
          </div>
        </Route>

        <Route>
          <div className='page__wrapper'>
            <Header />
            <Home />
            <Footer />
          </div>
        </Route>
      </Switch>
    </AppProvider>
  );
}

export default App;
