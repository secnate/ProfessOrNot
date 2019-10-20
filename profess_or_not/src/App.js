import {NavLink, Switch, Route} from 'react-router-dom';
import React from 'react';
import './App.css';

import About from "./pages/About/About.js";
import MainPage from "./pages/Main/Main.js";
import Professor from "./pages/Professor/Professor.js";
import Profile from "./pages/Profile/Profile.js";
import SearchClasses from "./pages/SearchClasses/SearchClasses.js"
import SignIn from "./pages/SignIn/SignIn.js";
import SignUp from "./pages/SignUp/SignUp.js";
import Test from "./pages/Test/Test.js";
import Dropdown from "./Dropdown/Dropdown.js";
import ContactUs from "./pages/ContactUs/ContactUs.js";

import Logo from "./logo.png";
import LogoTitle from "./logotitle.png";
import SearchIcon from "./search.png";


{/* A good chunk of this is based on the tutorial found on
    https://blog.pusher.com/getting-started-with-react-router-v4/
*/}

    function getLoginLogoutButtonText() {
      return "Login";
    }

    function clickLoginLogoutButton() {
      alert("Clicked Login/Logout Button");
    }

    function handleKeyPress(e) {
      if (e.charCode === 13) {
        

        var input = document.getElementById("searchInput").value;
        alert("Submitted Search With Input: \"" + input + "\"");
      }
    }

    const SearchBar = () => (
      <div id="background-wrapper">
        <div className="wrap">
          <div className="search">
            <button type="submit" className="searchButton" disabled>
              <img alt="" src={SearchIcon}/>
            </button>
            <input type="text" className="searchTerm" id="searchInput"
                   placeholder="Search For Professors" onKeyPress={handleKeyPress}/>
          </div>
        </div>
      </div>
    );


    const App = () => (
      <div className='app'>

        {/* We have the title bar for the application */}
        <div className="topBar">

          <div id="row">
            <div className="logoSection">
              <img src={Logo} alt=""
                  className="ProfessOrNotLogo"></img>
            </div>

            <div className="titleSection">
              <img src={LogoTitle} alt="" className="ProfessOrNotTitle"/>
            </div>

            <button className="loginLogoutButton"
                    onClick={clickLoginLogoutButton}>
              {getLoginLogoutButtonText}
            </button>
          </div>

          <div id="row">
            <Dropdown/>
            <SearchBar/>
          </div>

        </div>

        {/* This is the actual page we are displaying */}
        <div id="componentDiv">
          <Main/>
        </div>
        <div id="bottomBar"></div>
      </div>
    );

    const Navigation = () => (
      <nav> 
        <ul>
          <li><NavLink exact activeClassName="current" to='/'>Main</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/about'>About</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/professor'>Professor</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/profile'>Profile</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/searchclasses'>Classes</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/signin'>Sign In</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/signup'>Sign Up</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/test'>Test</NavLink></li>
          <li><NavLink exact activeClassName="current" to='/contactus'>Contact Us</NavLink></li>
        </ul>
      </nav>
    );

    {/* This involves all the routing that needs to be done */}

    
    // Display the actual pages
    const Main = () => (
      <Switch>
        <Route exact path='/' component={MainPage}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/professor' component={Professor}></Route>
        <Route exact path='/profile' component={Profile}></Route>
        <Route exact path='/searchclasses' component={SearchClasses}></Route>
        <Route exact path='/signin' component={SignIn}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/test' component={Test}></Route>
        <Route exact path="/contactus" component={ContactUs}></Route>
      </Switch>
    );
    

    export default App;

  