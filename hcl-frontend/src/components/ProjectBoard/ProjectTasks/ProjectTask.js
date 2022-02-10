import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { deleteProjectTask } from '../../../actions/backlogActions';
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Draggable from "react-draggable"
import { updateProjectTask } from '../../../actions/backlogActions';

const ProjectTask = ({projectTask, deleteProjectTask, updateProjectTask, moveTask, refreshBacklog}) => {
    const {projectSequence, priority, summary, acceptanceCriteria, projectIdentifier} = projectTask;
    let priorityString;
    let priorityClass;
    const [isDragging, setIsDragging] = useState(false);

    switch (priority) {
        case 1:
            priorityClass="bg-danger text-light";
            priorityString="HIGH";
            break;
        case 2:
            priorityClass="bg-warning text-light";
            priorityString="MEDIUM"
            break;
        case 3:
            priorityClass="bg-primary text-light";
            priorityString="LOW"
            break;
        default:
            break;
    }

    const getListInfo = () => {
        const tdList = document.getElementById("to-do-list");
        let tdRect = tdList.getBoundingClientRect();

        const ipList = document.getElementById("in-progress-list");
        let ipRect = ipList.getBoundingClientRect();

        const dList = document.getElementById("done-list");
        let dRect = dList.getBoundingClientRect();

        const info = {
            td: tdRect,
            ip: ipRect,
            d: dRect
        }

        return info;
    }

    const onDelete=(backlog_id, pt_id)=>{
        deleteProjectTask(backlog_id, pt_id);
        refreshBacklog()
    }

    const handleStart = (e, data) => {
        setIsDragging(true)
    }

    const onRelease = (e, data) => {
        const {td, ip, d} = getListInfo();
        let newStatus;
        let to;
        if(td.y === ip.y){
            if(e.x < ip.x){
                newStatus="TO_DO"
                to = "toDo"
            } else if(e.x >= ip.x && e.x < d.x){
                newStatus="IN_PROGRESS"
                to = "inProgress"
            } else{
                newStatus="DONE"
                to = "done"
            }
        } else {
            if(e.y < ip.y){
                newStatus="TO_DO"
                to = "toDo"
            } else if(e.y > ip.y && e.y < d.y){
                newStatus="IN_PROGRESS"
                to = "inProgress"
            } else{
                newStatus="DONE"
                to = "done"
            }
        }
        const pt = {
            ...projectTask,
            status: newStatus
        }
        updateProjectTask(projectIdentifier, projectSequence, pt);
        moveTask(to, pt)
        setIsDragging(false);
    }

    return (
        <Draggable
            onStart={handleStart}
            onStop={onRelease}
            position={!isDragging? { x: 0, y: 0 } : undefined}
            handle='.card-header'
        >
        <div className="card mb-1 bg-light project-task">
            <div className={"card-header text-primary " + priorityClass}>
                ID: {projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{summary}</h5>
                <p className="card-text text-truncate ">
                    {acceptanceCriteria}
                </p>
                <Link to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`} className="btn btn-secondary ms-2 me-2 text-light">
                    View / Update
                </Link>
                <button className="btn btn-secondary ms-2 me-2 text-light" onClick={()=>onDelete(projectIdentifier, projectSequence)}>
                    Delete
                </button>
            </div>
        </div>
        </Draggable>
    )
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired
}

export default connect(null, {deleteProjectTask, updateProjectTask}) (ProjectTask)