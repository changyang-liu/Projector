import './App.css';

import React, { Component } from 'react';
import { Badge, Button } from 'reactstrap';
import * as Constants from './constants';
import { Link } from 'react-router-dom';

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

                    {/* TODO: Only one of these buttons should be visible at any time */}
                    <Button
                        color="primary"
                        onClick={() => alert('Joining Project...')}
                    >
                        Join {data.name}!
                    </Button>
                    <Link className='btn btn-secondary' to={`/projects/${this.props.match.params.projectId}/edit`}>Edit</Link>

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
