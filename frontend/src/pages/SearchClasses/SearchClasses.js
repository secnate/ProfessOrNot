import React from 'react';
import './SearchClasses.css';

// This is the website's menu page for searching classes
export default class SearchClasses extends React.Component {

    all_classes = [
        {name: "MECH 101", instructor: "Lorem Ipsum", description: "Just a class"},
        {name: "MECH 101", instructor: "Dolor Sit", description: "Just a class"},
        {name: "MECH 201", instructor: "Amet Consecteur", description: "Just a class"},
        {name: "MECH 205", instructor: "Lorem Ipsum", description: "Just a class"},
        {name: "MECH 205", instructor: "Adipiscing Elit", description: "Just a class"},
        {name: "MECH 305", instructor: "Sed Do Eiusmod", description: "Just a class"},
        {name: "MECH 315", instructor: "Amet Consectur", description: "Just a class"},
        {name: "MECH 500", instructor: "Tempor Incididunt", description: "Just a class"},
        {name: "MECH 550", instructor: "Tempor Incididunt", description: "Just a class"}
    ];

    updateChecked() {
        if (document.getElementById("school").checked) {
            alert("DEBUG: school is checked");
        }
        else if (document.getElementById("professors").checked) {
            alert("DEBUG: professors is checked");
        } 
        else if (document.getElementById("other").checked) {
            alert("DEBUG: other is checked");
        }
    }

    getClassTableRows() {
        let tableRows = this.all_classes.map((classObject)=>{
            return (
                <tr>
                    <td className="nameCol">
                        {classObject.name}
                    </td>
                    <td className="instructorCol">
                        <button className="instructorLink" 
                              onClick={() => {this.openInstructorPage(classObject.instructor)} }>
                            <u>{classObject.instructor}</u> 
                        </button>
                    </td>
                    <td className="descriptionCol">
                        {classObject.description}
                    </td>
                </tr>
            );
        });
        return tableRows;
    }

    openInstructorPage(instructorName) { 
        alert("Opening instructor page for instructor \"" + instructorName + "\"");
    }

    render() { 

        return (
        
        <div className="classesPageLayout">
            <h1 id="classesPageTitle">Classes</h1>

            <form id="optionsForm">
                <p className="optionsPicker"> Sort By: </p>
                <input className="optionsPicker" type="radio" id="school" name="option"
                       value="school" defaultChecked onClick={this.updateChecked}/> School
                <input className="optionsPicker" type="radio" name="option"
                       id="professors" value="professors" onClick={this.updateChecked}/> Professors
                <input className="optionsPicker" type="radio" name="option"
                       id="other" value="other" onClick={this.updateChecked}/> Other
            </form>

            <table id="classTable">
                <tr>
                    <th className="nameCol">Name</th>
                    <th className="instructorCol">Instructor</th>
                    <th className="descriptionCol">Description</th>
                </tr> 
                {
                    this.getClassTableRows()
                }
            </table>

        </div>

        );
    }

}