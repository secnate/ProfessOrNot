import React, {Component} from "react";
import "./ContactForm.css";

// This is the ContactForm shown on the
// website's Contact page 

export default class ContactForm extends Component {

    constructor(props) {
        super(props);
        
        // items intered in the form
        this.state = {
            /* Modifying this changes the default value */
            name: '',
            email: '',
            phone: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        if (!this.canSubmitForm()) {
            alert("Can't Submit: You Haven't Filled Out All The Form's Boxes");
            return;
        }

        // Otherwise, we can definitely submit

        alert("Check Console printout!");
        console.log("Entered the following items into the form: ");
        console.log("\tName: " + this.state.name);
        console.log("\tEmail: " + this.state.email);
        console.log("\tPhone: " + this.state.phone);
        console.log("\tMessage: " + this.state.message);

        this.sendMessage();

        event.preventDefault();
    }

    sendMessage() {
        // since this is on the browser's side and 
        // there is nothing on the server side, we can't do anything
        this.clearForm();
    }

    canSubmitForm() {
        return (this.state.name !== '' &&
                this.state.email !== '' &&
                this.state.phone !== '' &&
                this.state.message !== '');
    }

    clearForm() {
        this.setState({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    }

    render() {
        //FIGURE OUT HOW TO HANDLE THE DATA INPUT PROBLEM
        return (

            <form onSubmit={this.handleSubmit}>
                
                <label className="formSectionTitle">
                    Name <br/>
                    <input type="text" className="inputBox" placeholder="Your name"
                           name="name" value={this.state.name} onChange={this.handleChange}/>
                </label><br/><br/>

                <label className="formSectionTitle">
                    Email <br/>
                    <input type="text" className="inputBox" placeholder="Your email"
                           name="email" value={this.state.email} onChange={this.handleChange}/>
                </label><br/><br/>

                <label className="formSectionTitle">
                    Phone <br/>
                    <input type="text" className="inputBox" placeholder="Your phone"
                           name="phone" value={this.state.phone} onChange={this.handleChange}/>
                </label><br/><br/>

                <label className="formSectionTitle">
                    Message <br/>
                    <textarea className="inputTextArea" placeholder="Your message"
                              name="message" value={this.state.message} onChange={this.handleChange}/>
                </label><br/>

                <input className="submitButton" type="submit" 
                       disabled={!this.canSubmitForm()} value="Submit"/>
            </form>

        );
    }
}