import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Recipe extends Component {

  render() {
    return (
      <div className="container">
        { this.props.num > 3 ? 
          div.smal
          
          :''}
      </div>
    );
  }
}

Recipe.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  recipe: PropTypes.object.isRequired,
  num: React.PropTypes.bool.isRequired,
};
