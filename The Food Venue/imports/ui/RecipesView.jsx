import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Recipe from './Recipe.jsx';

class RecipesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTxt: '',
            filterCategory: 'name',
          };
          this.getRecipe = this.getRecipe.bind(this);
          this.udpateSelect = this.udpateSelect.bind(this);
    }
    searchFood() {
        event.preventDefault();
        const fTxt = ReactDOM.findDOMNode(this.refs.filterText).value.trim();
        const fCat = ReactDOM.findDOMNode(this.refs.filterCategory).value.trim();
        this.setState({
            filterTxt: fTxt,
            filterCategory: fCat,
        });
    }
    getRecipe(recipeID) {
        this.props.viewRecipe(recipeID);
    }
    udpateSelect(newVal) {
        this.setState({
            filterCategory: newVal.target.value
        });
    }
    render() {
        return (
            <div>
                <div className="searchBar">
                    <input ref="filterText" type="text" placeholder="Search..." />
                    <select name="filterCategory" value={this.state.filterCategory} onChange={this.udpateSelect} ref="filterCategory">
                        <option value="name">Name</option>
                        <option value="country">Country</option>
                        <option value="food">Food Type</option>
                    </select>
                    <button onClick={this.searchFood.bind(this)}>SEARCH</button>
                </div>
                {this.props.recipes.map((recipe, i) => {
                    if (this.state.filterCategory === 'name') {
                        if (recipe.name.includes(this.state.filterTxt)) {
                            return (
                                <Recipe key={recipe._id} recipe={recipe} num={i} seeRecipe={this.getRecipe} />
                            );
                        }
                    } else if (this.state.filterCategory === 'country') {
                        if (recipe.country.includes(this.state.filterTxt)) {
                            return (
                                <Recipe key={recipe._id} recipe={recipe} num={i} seeRecipe={this.getRecipe} />
                            );
                        }
                    } else {
                        return (
                            <Recipe key={recipe._id} recipe={recipe} num={i} seeRecipe={this.getRecipe}/>
                        );
                    }
                })}
            </div>
        );
    }
}

RecipesView.propTypes = {
    recipes: PropTypes.array.isRequired,
    viewRecipe: PropTypes.func.isRequired,
};

// srojas19: exportar clase al final para reconocer propTypes
export default RecipesView;
