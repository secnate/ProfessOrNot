import React from 'react';
import './About.css';

// This is the website's menu page
export default class About extends React.Component {


    render() { 

        return (
        <div id="aboutPageLayout">
            <h1 id="aboutTitle">About</h1>
            <p id="explanationText">This application is called <i>ProfessOrNot</i>. 
                Its goal is to help students make optimal scheduling 
                decisions by picking professors fitting their learning styles.</p>
        </div>
        );
    }

}