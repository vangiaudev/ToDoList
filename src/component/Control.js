/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

// Review code
class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search onSearch={this.props.onSearch}/>
            </div>
            
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Sort onSort = {this.props.onSort}/>
            </div>
            
          </div>
        );
    }
}

export default Control;