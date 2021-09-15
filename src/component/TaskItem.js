import React, { Component } from 'react';

class TaskItem extends Component {
  onUpdateStatus = () =>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }
  onUpdate = () =>{
    this.props.onUpdate(this.props.task.id);
  }
    render() {
      var {task, index} = this.props;
        return (
            <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">

              <span
                onClick={this.onUpdateStatus}
                className={task.status === true ? 'label label-success' : 'label label-warning'} 
              >{task.status === true ? 'Kích Hoạt' : 'Ẩn'}</span>

            </td>
            <td>
              
              <button 
                type="button"
                onClick={this.onUpdate}
                className="btn btn-danger">
                <i className="fas fa-edit">&nbsp;Sửa</i>
              </button>
              &nbsp;
              <button
                onClick = {this.onDelete}
                type="button" 
                className="btn btn-danger" >
                <i className="fas fa-trash">&nbsp;Xóa</i>
              </button>
            </td>
          </tr>
        );
    }
}

export default TaskItem;