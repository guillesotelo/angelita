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
import SuccessPayment from './pages/SuccessPayment/SuccessPayment';
import Mission from './pages/Mission/Mission';
import Profession from './pages/Profession/Profession';
import Metodologies from './pages/Metodologies/Metodologies';

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

        <Route path="/politicas-de-privacidad">
          <div className='page__wrapper'>
            <Header />
            <PrivacyPolicy />
            <Footer />
          </div>
        </Route>

        <Route path="/sobre-mi">
          <div className='page__wrapper'>
            <Header />
            <About />
            <Footer />
          </div>
        </Route>

        <Route path="/contacto">
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

        <Route path="/suscribirme">
          <div className='page__wrapper'>
            <Header />
            <Subscribe />
            <Footer />
          </div>
        </Route>

        <Route path="/mision">
          <div className='page__wrapper'>
            <Header />
            <Mission />
            <Footer />
          </div>
        </Route>

        <Route path="/profesion-y-servicio">
          <div className='page__wrapper'>
            <Header />
            <Profession />
            <Footer />
          </div>
        </Route>

        <Route path="/metodologias">
          <div className='page__wrapper'>
            <Header />
            <Metodologies />
            <Footer />
          </div>
        </Route>

        <Route path="/successPayment">
          <div className='page__wrapper'>
            <Header />
            <SuccessPayment />
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
