import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Recipe extends Component {
  constructor(props) {
    super(props);

    this.goRecipe = this.goRecipe.bind(this);
    //se realiza el bind adecuadamente, aunque se pueden explorar otras formas más sencillas de hacerlo como usar arrow functions
  }
  goRecipe(idR) {
    this.props.seeRecipe(idR);
  }
  render() {
    let recipeClass = '';
    //Muy buen uso de let en ECMAScript 6 en vez de var
    if (this.props.num > 2) {
      recipeClass = 'smallRecipe';
    } else if (this.props.num === 2) {
      recipeClass = 'bigRecipe recipe3';
    } else if (this.props.num === 1) {
      recipeClass = 'bigRecipe recipe2';
    } else {
      recipeClass = 'bigRecipe recipe1';
    }
    return (
      <div onClick={() => { this.goRecipe(this.props.recipe._id) }} className={recipeClass}>
        <div className="recipeContent">
          <div className="rating">
            {this.props.recipe.rating}
            <img src="/favorite.png" alt="" />
          </div>
          <div className="title1">
            {this.props.recipe.name}
          </div>
          <div className="text1">
            {this.props.recipe.username}
          </div>
        </div>
      </div>
    );
  }
}
Recipe.propTypes = {
  //Muy bien por utilizar proptypes
  recipe: PropTypes.object.isRequired,
  num: React.PropTypes.number.isRequired,
  seeRecipe: PropTypes.func.isRequired,
};
