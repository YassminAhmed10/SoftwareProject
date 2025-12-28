// src/components/TaskCard/TaskCard.jsx
import React from 'react';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  const getPriorityIcon = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return <AlertCircle size={16} className="priority-high" />;
      case 'medium': return <AlertCircle size={16} className="priority-medium" />;
      case 'low': return <AlertCircle size={16} className="priority-low" />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-checkbox">
          {task.completed ? (
            <CheckCircle size={20} className="checked" />
          ) : (
            <Circle size={20} className="unchecked" />
          )}
        </div>
        <div className="task-title">
          <h3>{task.title}</h3>
          <div className="task-priority">
            {getPriorityIcon(task.priority)}
            <span>{task.priority}</span>
          </div>
        </div>
      </div>
      
      <div className="task-card-body">
        <p className="task-description">{task.description}</p>
        
        {task.dueDate && (
          <div className="task-due-date">
            <Clock size={16} />
            <span>Due: {task.dueDate}</span>
          </div>
        )}
      </div>
      
      <div className="task-card-footer">
        <div className="task-assignee">
          {task.assigneeAvatar ? (
            <img src={task.assigneeAvatar} alt={task.assignee} className="assignee-avatar" />
          ) : (
            <div className="assignee-initial">{task.assignee.charAt(0)}</div>
          )}
          <span>{task.assignee}</span>
        </div>
        
        <div className="task-tags">
          {task.tags.map((tag, index) => (
            <span key={index} className="task-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;