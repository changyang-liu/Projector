import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
            <div className="UserPage">
                <Card style={{width:"80%", height:"80%"}} className="mx-auto my-auto">
                    <CardImg top width="100%" src={this.state.image} alt="Profile Picture" />
                    <CardBody>
                        <CardText><Profile person={this.state.person}/></CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default UserPage;
