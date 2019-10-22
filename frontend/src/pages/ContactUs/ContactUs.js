import React from "react";
import './ContactUs.css';
import ContactForm from "./ContactForm";

// This is the website's menu page
export default class Contact extends React.Component {

    render() { 
        return (
        <div className='contact'>
            <h1 className="contactTitle">Contact Us</h1>
            
            {/* Do contact form here */}
            <p className="introText"> 
                We are here to answer any questions, 
                      comments or concerns you may have about 
                      your experience with <strong>ProfessOrNot</strong>. 
                      Fill out the form and we will get back 
                      to you as soon as we can.
            </p>
            <ContactForm/>
        </div>
      );
    }
}