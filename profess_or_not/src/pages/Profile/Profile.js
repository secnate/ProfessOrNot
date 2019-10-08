import React from 'react';
import './Profile.css';
import DefaultProfilePicture from "../../defaultProfilePic.png";

// This is the website's menu page
export default class Profile extends React.Component {

    getProfileName() {
        return "Lorem Ipsum"
    }

    getProfileMajor() {
        return "Mechanical Engineering"
    }

    getProfileUniversity() {
        return "Lorem Ipsum University"
    }

    getProfileStanding() {
        return "Senior"
    }

    render() { 

        return (
        <div className="profilePage">
            <h1 className="pageTitle">
                <br/><br/>
                <span className="profileEmphasis">Your Profile: </span> {this.getProfileName()}
            </h1>


            
        </div>
        );
    }

}