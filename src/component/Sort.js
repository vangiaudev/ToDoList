/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Sort extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort : {
        by: 'name',
        value : 1
      }
    }
  }
  onClick = (sortBy, sortValue) =>{
    this.setState({
      sort: {
        by : sortBy,
        value : sortValue
      }
    }, () =>this.props.onSort(this.state.sort)
    );
    
  
  }
    render() {
      var {sort} = this.state;
        return (
            <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          Sắp Xếp <i className="fas fa-sort"></i>
            </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick={() => this.onClick('name', 1)} >
                              <a role="button" >
                                    <i className="fas fa-sort-alpha-up">
                                      &nbsp; Tên A-Z &nbsp;
                                      <span className={(sort.by === 'name' && sort.value === 1) ? 'fa-check-circle' : ''}></span>
                                    </i>

                              </a>
                            </li>
                            <li onClick={() => this.onClick('name', -1)}>
                                <a role="button" >
                                  <i className="fas fa-sort-alpha-down">
                                          &nbsp; Tên Z-A &nbsp;
                                          <span className={(sort.by === 'name' && sort.value === -1) ? 'fa-check-circle' : ''}></span>
                                  </i>
                                </a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li onClick={() => this.onClick('status', 1)}>
                              <a role="button" className={(sort.by === 'status' && sort.value === 1) ? 'sort_selected' : ''}>Trạng Thái Kích Hoạt
                              </a>
                              
                            </li>
                            <li onClick={() => this.onClick('status', -1)}>
                              <a role="button" className={(sort.by === 'status' && sort.value === -1) ? 'sort_selected' : ''}>Trạng Thái Ẩn &nbsp;
                              </a>          
                            </li>
              </ul>
            </div>
        );
    }
}

export default Sort;