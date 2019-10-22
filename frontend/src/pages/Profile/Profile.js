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

    getProfilePicture() {
        return DefaultProfilePicture;
    }

    getLearningTypeText() {
        // returns 5 different learning-type texts in an array for future usage
        return ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", 
                "Lorem ipsum", "Lorem ipsum"];
    }

    getLearningTypeHTML() {
        let listLearningStyles = this.getLearningTypeText().map((learningType)=>{
            return (
                <li className="learningTypeBullet">{learningType}</li>
            );
        });
        return listLearningStyles;
    }

    getSizeLearningTypeArray() {
        return 5;
    }

    render() { 

        return (
        <div className="profilePage">
            <h1 className="pageTitle">
                <br/><br/>
                <span className="profileEmphasis">Your Profile: </span> {this.getProfileName()}
            </h1>

            <div id="contentBox">

                {/* columns divs, float left, no margin so there is no space between column, width=1/3 */}
                <div id="column1">
                    <br/><br/>
                    <p className="profileInfoText"> Major: {this.getProfileMajor()}</p>
                    <p className="profileInfoText"> Studies at: {this.getProfileUniversity()}</p>
                    <p className="profileInfoText"> Standing: {this.getProfileStanding()}</p>

                    <div className="learningTypeBox">
                        <ul>
                            <li className="learningTypeBullet"><u>Learning Type:</u></li>
                            {
                                this.getLearningTypeHTML()
                            }
                        </ul>
                    </div>
                </div>

                <div id="column2">
                    <img src={DefaultProfilePicture} alt="" className="profilePic"/>
                </div>
            </div>
            
            
        </div>
        );
    }

}