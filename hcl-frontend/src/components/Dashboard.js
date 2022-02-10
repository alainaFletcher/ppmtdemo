import React, {useEffect} from 'react'
import CreateProjectButton from './project/CreateProjectButton';
import ProjectItem from './project/ProjectItem';
import {connect} from "react-redux";
import {getProjects} from "../actions/projectActions";
import PropTypes from "prop-types"
import FillImg from "../images/tree.png"; 

const Dashboard = ({project, getProjects}) => {

    useEffect(() => {
        getProjects();
    }, []);

    const {projects} = project;
    return (
        <div className="projects">
        <div className="col-sm-8">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Projects</h1>
                    <br />
                    <CreateProjectButton/>
                    <br />
                    <hr />
                    {projects.map(p => {
                        return <ProjectItem 
                            key={p.id} 
                            project={p}
                        />
                    })}
                </div>
            </div>
        </div>
        </div>
        <div className="col-xs-5 right">
            <img src={FillImg} alt="bonsai" id="not"/>
        </div>
    </div>

    )
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project:state.project
})

export default connect(
    mapStateToProps, 
    {getProjects}
)(Dashboard);