//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Row, Col, Card, CardImg, CardTitle, CardBody } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectPage from './ProjectPage'

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        projects: null
      }
      this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
      // TODO: Fetch project data
      this.setState({
        projects: [
        {
          id: 1,
          title: "Projector",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 2,
          title: "Another Project",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 3,
          title: "Project #3",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 4,
          title: "Project #4",
          description: "This is just a sample description so that you can figure out what's going on here."
        },
        {
          id: 5,
          title: "Project #5",
          description: "This is just a sample description so that you can figure out what's going on here."
        }
        ]
      });
    }

    handleSearch(event) {
      let newList = [];

      if (event.target.value !== "") {
        // search query is not empty, so filter projects by title
        let currentList = this.state.projects;

        // TODO: make a better search that doesn't search only project titles
        newList = currentList.filter(project => {
          const lc = project.title.toLowerCase();
          const filter = event.target.value.toLowerCase();
          return lc.includes(filter);
        });

      } else {
        // if search query is empty, show all projects
        newList = this.state.projects;
      }

      this.setState({
        filtered: newList
      });
    }

    getProjectTiles() {
      const { projects, filtered } = this.state;
      const toUse = filtered ? filtered : projects;

      let indexPage;
      
      if(projects) {
        // Generate project tiles from filtered or projects list
        indexPage = toUse.map(project => (
          <Col xs="auto" className="mb-4" key={project.id}>
            <ProjectTile key={project.id} project={project} />
          </Col>
        ));
      } else {
        // Show loading page if projects haven't been fetched yet
        indexPage = (<div>Loading...</div>);
      }

      return indexPage;
    }

    render() {
      const { projects } = this.state;

      return (
        <Router>
          {/*Split up index page into separate component?*/}
          <Route exact={true} path='/' render={() => (
            <div>
              <div className="title"> 
                Projector
              </div>
              {/* TODO: improve search styling */}
              <SearchBox handleSearch={this.handleSearch}></SearchBox>
              <Container className="mt-4">
                  <Row className="justify-content-center">
                    {this.getProjectTiles()}
                  </Row>
              </Container>
            </div>
          )} />
          <Route path='/projects/:projectId' render={(props) => <ProjectPage {...props} projects={projects} />} />
        </Router>
      );
    }
}

const ProjectTile = ({ project }) => (
  <Card>
      {/* TODO: project logo */}
      <CardImg variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" alt="Project Logo" />
      <CardBody>
        <CardTitle>{project.title}</CardTitle>
        <a href={`/projects/${project.id}`} className="stretched-link">{project.description}</a>
      </CardBody>
  </Card>
);

const SearchBox = ({ handleSearch }) => (
  <span>
    <input 
      type="text"
      placeholder="Search for projects"
      onChange={handleSearch}
      className="search-box"
    />
  </span>
);

export default App;
