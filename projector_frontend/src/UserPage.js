import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

function Image(props){
    return (
        <div className="Image" style={{backgroundImage: 'url(' + props.src + ')'}}></div>
    );
}

function Profile({person}) {
    return (
        <div className="Profile">
            { /*todo: retrieve details from backend; projects*/}
            <h1 className="Name">Hi, {person.name}</h1>
            <p className="Email">{person.email}</p>
            <p className="Skills">{person.skills}</p>
            <p className="Interests">{person.interests}</p>
            <p className="Projects">{person.projects}</p>
        </div>
    );
}

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: "",
                email: "",
                skills: "",
                interests: "",
                projects: [],
            },
            image: "",
        };
    }

    /*todo: retrieve current user details from backend*/

    render() {
        return (
            <div className="UserPage">
                <Image props={this.state.image}/>
                <Profile person={this.state.person}/>
            </div>
        );
    }
}

export default UserPage;
