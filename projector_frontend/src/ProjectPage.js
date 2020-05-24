import './App.css';

import React, { Component } from 'react';
import { Badge, Button, Media } from 'reactstrap';
import * as Constants from './constants';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import MemberModal from './components/MemberModal';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: undefined,
            showMembers: false,
        };
        this.toggleMemberList = this.toggleMemberList.bind(this);
    }

    componentDidMount() {
        fetch(`${Constants.PROJECT_LIST_URL}${this.props.match.params.projectId}`)
            .then((resp) => {
                if (!resp.ok) {
                    // Invokes the .catch() handler
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then((data) => {
                this.setState({ project: { failed: false, data: data } });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ project: { failed: true, error: error } });
            });
    }

    toggleMemberList() {
        this.setState({
            showMembers: !this.state.showMembers,
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
            return <p>{'' + project.error}</p>;
        }

        const { data } = project;

        let videoId = null;
        try {
            const youtubeUrl = new URL(data.video);
            const params = new URLSearchParams(youtubeUrl.search);
            videoId = params.get('v');
        } catch {
            // There's no video, or the URL is malformed
        }

        let slidesEmbedUrl = null;
        try {
            const slidesUrl = new URL(data.deck);
            const key = slidesUrl.pathname.replace(/\/presentation\/d\/(.*)\/.*/g, '$1');
            slidesEmbedUrl = `https://docs.google.com/presentation/d/${key}/embed?start=false&loop=false&delayms=5000`;
        } catch {
            // There's no slides, or the URL is malformed
        }

        const logoUrl = data.logo !== Constants.DEFAULT_PROJECT_LOGO ? Constants.PROJECT_LOGO_PATH + data.logo : null;
        return (
            <div className="ProjectPage-container">
                <div className="ProjectPage-leftpanel">
                    <p>Owner: {data.owner}</p>
                    <p>
                        Category <Badge color="secondary">{data.category}</Badge>
                    </p>
                    {/* TODO: Only one of these buttons should be visible at any time */}
                    {/* TODO: Join project */}
                    <Button color="primary" onClick={() => alert('Joining Project...')}>
                        Join {data.name}!
                    </Button>
                    <br />
                    <Link
                        style={{ marginTop: 16 }}
                        className="btn btn-secondary"
                        to={`/projects/${this.props.match.params.projectId}/edit`}
                    >
                        Edit
                    </Link>
                    <Button color="primary" onClick={this.toggleMemberList}>
                        See Who's Joined
                    </Button>
                </div>
                <div className="ProjectPage-rightpanel">
                    <div className="ProjectPage-header-container">
                        <h1 className="ProjectPage-title">{data.name}</h1>
                    </div>
                    <div className="ProjectPage-media-container">
                        {videoId && (
                            <YouTube videoId={videoId} containerClassName="ProjectPage-youtube-container" className="ProjectPage-youtube" />
                        )}
                        {slidesEmbedUrl && (
                            <div className="ProjectPage-slides-container">
                                <iframe title="Project Slides" src={slidesEmbedUrl} width="100%" height="100%" allowFullScreen={true} />
                            </div>
                        )}
                    </div>
                    <p style={{ marginTop: 16 }}>{data.description}</p>
                </div>
                <MemberModal open={this.state.showMembers} onClick={this.toggleMemberList} />
            </div>
        );
    }
}

export default ProjectPage;
