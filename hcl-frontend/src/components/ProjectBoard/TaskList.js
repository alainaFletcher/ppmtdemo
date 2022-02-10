import React from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';

const TaskList = ({tasks, moveTask, refreshBacklog, from}) => {
  return <div>
            <div className='high-priority'>
                {tasks.map(pt => (pt.priority === 1) ? <ProjectTask 
                                key={pt.id} 
                                projectTask={pt}
                                moveTask={(to, task) => moveTask(from, to, task)}
                                refreshBacklog={refreshBacklog}
                            /> : <></>
                )}
                </div>
                <div className='mid-priority'>
                {tasks.map(pt => (pt.priority === 2) ? <ProjectTask 
                                key={pt.id} 
                                projectTask={pt}
                                moveTask={(to, task) => moveTask(from, to, task)}
                                refreshBacklog={refreshBacklog}
                            /> : <></>
                )}
                <div className='low-priority'>
                {tasks.map(pt => (pt.priority === 3) ? <ProjectTask 
                                key={pt.id} 
                                projectTask={pt}
                                moveTask={(to, task) => moveTask(from, to, task)}
                                refreshBacklog={refreshBacklog}
                            /> : <></>
                )}
                </div>
            </div>
        </div>;
};

export default TaskList;
