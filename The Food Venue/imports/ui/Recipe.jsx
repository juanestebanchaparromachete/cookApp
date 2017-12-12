import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.goRecipe = this.goRecipe.bind(this);
  }
  goRecipe(idR) {
    this.props.seeRecipe(idR);
  }
  render() {
    let recipeClass = '';
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
  recipe: PropTypes.object.isRequired,
  num: React.PropTypes.number.isRequired,
  seeRecipe: PropTypes.func.isRequired,
};

// srojas19: Exportar clase al final para que reconozca que propTypes debe recibir.
export default Recipe;
