import {NavLink, Switch, Route} from 'react-router-dom';
import React from 'react';
import './Dropdown.css';
import menuIcon from "../menuIcon.png";

class Dropdown extends React.Component {

    constructor() {
        super();

        this.isHidden = true;

        this.state = {
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropDownMenu);
        });
    }

    hideDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }

    toggleDropdownMenu(event) {
        if (this.state.displayMenu === true) {
            this.hideDropdownMenu(event);
        }
        else {
            this.showDropdownMenu(event);
        }
    }

    render() {
        return (
        <div  className="dropdown" >
             <div className="button" onClick={this.toggleDropdownMenu}>
                <img src={menuIcon} alt="" className="menuIcon"/>
                &nbsp; Menu
            </div>
    
            {/*Exchanged the <nav> for <div>*/}
              { this.state.displayMenu ? (
              
            <div className="dropdown">
                <ul>
                <li className="homeLink"><NavLink exact activeClassName="current" to='/'>Home</NavLink></li> 
                <li><NavLink exact activeClassName="current" to='/profile'>Profile</NavLink></li> 
                <li><NavLink exact activeClassName="current" to='/searchclasses'>Classes</NavLink></li> 
                <li><NavLink exact activeClassName="current" to='/professor'>Professors</NavLink></li>
                <li><NavLink exact activeClassName="current" to='/about'>About</NavLink></li> 
                <li><NavLink exact activeClassName="current" to='/contactus'>Contact Us</NavLink></li> 
                </ul>
            </div>

            ):
            (
              null
            )
        }
        </div> 
       
        );
    }
}

export default Dropdown