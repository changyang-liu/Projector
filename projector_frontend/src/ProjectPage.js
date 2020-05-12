import './App.css';

import React from 'react';
import { Badge, Button } from 'reactstrap';

function ProjectPage({ match, projects }) {
    if (!projects) {
        // This means that we are still waiting for the data to be fetched.
        // This could show some loading icon/message if we want.
        return null;
    }

    const project = projects.find((p) => p.id === +match.params.projectId);
    if (!project) {
        // TODO: Make an actual 404 page?
        return <p>404 Not Found</p>;
    }

    return (
        <div className="ProjectPage-container">
            <div className="ProjectPage-leftpanel">
                {/* Obviously this information shouldn't be hardcoded */}
                <p>Owner: Alex Yu</p>
                <p>
                    Category <Badge color="secondary">Technology</Badge>
                </p>
                <Button
                    color="primary"
                    onClick={() => alert('Joining Project...')}
                >
                    Join {project.title}!
                </Button>
            </div>
            <div className="ProjectPage-rightpanel">
                <h3 className="text-center">{project.title}</h3>
                <p>{project.description}</p>
            </div>
        </div>
    );
}

export default ProjectPage;
