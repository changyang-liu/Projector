import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

function Image(props){
    return (
        <div className="Image" style={{backgroundImage: 'url(' + props.src + ')'}}></div>
    );
}

function Profile({person}) {
    return (
        <div className="Profile">
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
                email: props.user.email,
                skills: "",
                interests: "",
                projects: [],
            },
            image: "",
        };
        /*todo: fetch user details from backend and construct person details*/
    }

    render() {
        return (
            <Container className="mt-4">
                <Container className="mx-auto">
                    <Image props={this.state.image}/>
                </Container>
                <Container className="mt-lg-4">
                    <Profile person={this.state.person}/>
                </Container>
            </Container>
        );
    }
}

export default UserPage;
