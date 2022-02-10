import React from 'react'
import { Link } from 'react-router-dom'; 
import PropType from "prop-types";
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';

const ProjectItem = ({project, deleteProject}) => {

    const onDeleteClick = () => {
        deleteProject(project.projectIdentifier);
    }

    return (
        <div className="container">
                        <div className="card card-body bg-light mb-3">
                            <div className="row">
                                <div className="col-2">
                                    <span className="mx-auto">{project.projectIdentifier}</span>
                                </div>
                                <div className="col-lg-6 col-md-4 col-8">
                                    <h3>{project.projectName}</h3>
                                    <p>{project.description}</p>
                                </div>
                                <div className="col-md-4 d-none d-lg-block">
                                    <ul className="list-group">
                                        <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                            <li className="list-group-item board bg-primary rounded text-dark">
                                                <i className="fa fa-list-ul"> Project Board </i>
                                            </li>
                                        </Link>
                                        <Link to={`/updateProject/${project.projectIdentifier}`}>
                                            <li className="list-group-item update bg-primary rounded text-dark">
                                                <i className="fa fa-pencil"> Update Project Info</i>
                                            </li>
                                        </Link>
                                            <li className="list-group-item delete bg-primary rounded text-dark"
                                            onClick={onDeleteClick}>
                                                <i className="fa fa-window-close"> Delete Project</i>
                                            </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

ProjectItem.propTypes = {
    deleteProject: PropType.func.isRequired
}

export default connect(null, {deleteProject}) (ProjectItem);