import './App.css';

import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import * as Constants from './constants';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: undefined,
        };
    }

    componentDidMount() {
        fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}`)
            .then(resp => {
                if (!resp.ok) {
                    // Invokes the .catch() handler
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then(data => {
                this.setState({ project: { failed: false, data: data } });
            })
            .catch(error => {
                console.log(error);
                this.setState({ project: { failed: true, error: error } });
            });
    }

    render() {
        const { project } = this.state;
        if (project === undefined) {
            // This means that we are still waiting for the data to be fetched.
            // This could show some loading icon/message if we want.
            return <p>Loading...</p>;
        }

        if (project.failed) {
            return <p>{"" + project.error}</p>;
        }

        const { data } = project;
        return (
            <div className="ProjectPage-container">
                <div className="ProjectPage-leftpanel">
                    <p>Owner: {data.owner}</p>
                    <p>
                        Category <Badge color="secondary">{data.category}</Badge>
                    </p>
                    <Button
                        color="primary"
                        onClick={() => alert('Joining Project...')}
                    >
                        Join {data.name}!
                </Button>
                </div>
                <div className="ProjectPage-rightpanel">
                    <h3 className="text-center">{data.name}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        );
    }
}

export default ProjectPage;
