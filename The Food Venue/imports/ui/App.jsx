import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Chefs } from '../api/chef.js';
import { Recipes } from '../api/recipe.js';


import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Landing from './Landing.jsx';
import NewRecipe from './NewRecipe.jsx';
import RecipesView from './RecipesView.jsx';
import RecipeDetail from './RecipeDetail.jsx';
import NewUser from './NewUser.jsx';
import Chef from './Chef.jsx';

// App component - represents the whole app

//En general muy buen trabajo, excelente uso de componentes, funciones, proptypes, entre otros.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'Landing',
      currentRecipe: '',
      currentChef: '',
    };
    this.toggleShowRecipes = this.toggleShowRecipes.bind(this);
    this.toggleRecipeDetail = this.toggleRecipeDetail.bind(this);
    this.toggleProfileID = this.toggleProfileID.bind(this);
    this.toggleLanding = this.toggleLanding.bind(this);
  }
  toggleCreateRecipe() {
    this.setState({
      currentPage: 'CreateRecipe',
    });
  }
  incompleteUser() {
    if (this.state.currentPage != 'incompleteUser') {
      if (!this.props.user && this.props.currentUser) {
        this.setState({
          currentPage: 'incompleteUser',
        });
      }
    }
  }
  toggleLanding() {
    this.setState({
      currentPage: 'Landing',
    });
  }
  toggleShowRecipes() {
    this.setState({
      currentPage: 'Recipes',
    });
  }
  showProfile(userId) {
    const currentChef = Chefs.findOne({ userID: userId });
    return (
      <Chef chef={currentChef} user={this.props.currentUser} />
    );
  }
  showRecipe() {
    const currentRecipe = Recipes.findOne({ _id: this.state.currentRecipe});
    return (
      <RecipeDetail recipe={currentRecipe} goUser={this.toggleProfileID} curUser={this.props.currentUser}/>
    );
  }
  toggleMyProfile() {
    this.setState({
      currentPage: 'Chef',
    });
  }
  toggleRecipeDetail(recipeId) {
    this.setState({
      currentPage: 'RecipeDetail',
      currentRecipe: recipeId,
    });
  }
  toggleProfileID(userID) {
    this.setState({
      currentPage: 'ChefDetail',
      currentChef: userID,
    });
  }
  showChefDetail() {
    const currentChef = Chefs.findOne({ userID: this.state.currentChef });
    return (
      <Chef chef={currentChef} user={this.props.currentUser} viewRecipe={this.toggleRecipeDetail} />
    );
  }
  render() {
    return (
      <div className="container">
        {this.incompleteUser() ? '' : ''}
        <header>
          <div className="navbar">
            <img onClick={this.toggleLanding.bind(this)} src="logo.svg" alt="" />
            <div onClick={this.toggleLanding.bind(this)} className="navTitle">
              the food venue
            </div>
            <button aria-label="Search a recipe" onClick={this.toggleShowRecipes.bind(this)}>SEE ALL RECIPES</button>
            {this.props.currentUser ? <span> <button aria-label="Add a new recipe" onClick={this.toggleCreateRecipe.bind(this)}>ADD RECIPE</button> <button aria-label="See my profile" onClick={this.toggleMyProfile.bind(this)}>MY PROFILE</button></span> : ''}
            <AccountsUIWrapper />
          </div>
        </header>
        {this.state.currentPage === 'Landing' ? <Landing recipes={this.toggleShowRecipes} /> : ''}
        {this.state.currentPage === 'CreateRecipe' ? <NewRecipe user={this.props.user} /> : ''}
        {this.state.currentPage === 'incompleteUser' ? <NewUser togLanding={this.toggleLanding} /> : ''}
        {this.state.currentPage === 'Recipes' ? <RecipesView recipes={this.props.recipes} viewRecipe={this.toggleRecipeDetail} /> : ''}
        {this.state.currentPage === 'Chef' ? this.showProfile(this.props.currentUser._id) : ''}
        {this.state.currentPage === 'RecipeDetail' ? this.showRecipe() : ''}
        {this.state.currentPage === 'ChefDetail' ? this.showChefDetail() : ''}
        <div className="footer">
          <span>
            2017 The Food Venue. Sas Zero rights reserved. The Food Venue is not a registered service mark of The Food Venue. Sas.
          </span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');
  Meteor.subscribe('chefs');
  Meteor.subscribe('recipes');
  if (Meteor.user()) {

    return {
      user: Chefs.findOne({ userID: Meteor.user()._id }),
      currentUser: Meteor.user(),
      recipes: Recipes.find({}, { sort: { rating: -1 } }).fetch(),
    }
  } else {
    return {
      currentUser: Meteor.user(),
      recipes: Recipes.find({}, { sort: { rating: -1 } }).fetch(),
    }
  }
}, App);
