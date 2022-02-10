import React, {useEffect, useState} from 'react'
import Backlog from './Backlog'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import {connect} from "react-redux"
import PropTypes from "prop-types";
import { getBacklog } from '../../actions/backlogActions';

const ProjectBoard = ({backlog, getBacklog, errors}) => {
    const {id} = useParams();
    const tasks = backlog.projectTasks;
    const [currErrors, setCurrErrors] = useState({});
    const refreshBacklog = async () => await getBacklog(id);
    useEffect(() => {
        getBacklog(id); 
    }, [])
    useEffect(() => {
        setCurrErrors(errors);
    }, [errors])

    let BoardContent;

    const boardAlgorithm = (errors, tasks) => {
        if(tasks.length < 1){
            if(errors.projectNotFound || errors.projectIdentifier){
                return(
                    <div className="alert alert-danger text-center" role="alert">
                        {errors.projectNotFound || errors.projectIdentifier}
                    </div>
                )
            } else {
                return(
                    <div className="alert alert-info text-cent" role="alert">
                        No Project Tasks on This Board
                    </div>
                )
            }
        } else {
            return(
                <Backlog projectTasks={tasks} refreshBacklog={refreshBacklog}/>
            )
        }
    }

    BoardContent= boardAlgorithm(errors, tasks);
    return (
        <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-lg btn-secondary text-light">
                <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            {BoardContent}
        </div>
    )
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
})

export default connect(mapStateToProps, {getBacklog}) (ProjectBoard)