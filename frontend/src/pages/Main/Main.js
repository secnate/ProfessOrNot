import React from 'react';
import './Main.css';

// This is the website's menu page
export default class Main extends React.Component {

    openTestPage() {
        alert("Opening The Learning Styles Test Page");
    } 

    openLoginPage() {
        alert("Opening The Login Page");
    }

    getWhatWeDoHereText() {
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod";
    }

    getWhatsNewText() {
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod";
    }

    render() { 

        return (
        <div id="mainPageLayout">

            <div class="column">
                
                <h1 id="topSectionTitle">New Here?</h1>
                <h1 id="topSectionTitleCommentary">
                    <span className="openNewPageLink" onClick={this.openTestPage}>
                        <u>Take Our Test</u></span> To Match To A Professor
                </h1>
            
                <br/>
                <div className="bottomSection">
                    <h2 id="bottomSectionTitle"><u>What Do We Do Here?</u></h2>
                    <h2 id="bottomSectionText">{this.getWhatWeDoHereText()}</h2>
                </div>
            </div>

            <div class="column">
                
                <h1 id="topSectionTitle">Been Here Before?</h1>
                <h1 id="topSectionTitleCommentary">
                    <span className="openNewPageLink" onClick={this.openLoginPage}>
                        <u>Log In</u></span> To See Your Profile
                </h1>

                <br/>
                <div className="bottomSection">
                    <h2 id="bottomSectionTitle"><u>What's New?</u></h2>
                    <h2 id="bottomSectionText">{this.getWhatsNewText()}</h2>
                </div>

            </div>
        </div>
        );
    }

}