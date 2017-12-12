import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Recipes } from '../api/recipe.js';

//imports sin usar, como import Task from 'classnames';
//es importante tambien dejar el codigo limpio e ir quitando cosas que no se va a usar

// Task component - represents a single todo item
export default class Chef extends Component {

    constructor(props) {
        super(props);
        this.goRecipe = this.goRecipe.bind(this);
        //se realiza el bind adecuadamente, aunque se pueden explorar otras formas más sencillas de hacerlo como usar arrow functions
    }
    goRecipe(idR) {
        this.props.viewRecipe(idR);
      }

    isFollowing() {

        for (i = 0; i < this.props.chef.following.length; i++) {
            if (this.props.chef.following[i].userID == this.props.user._id)
                return true;
        }
        return false;

    }

    follow(id) {
        Meteor.call('chefs.follow', id);
        Meteor.call('chefs.followMy', id);
    }

    unfollow(id) {
        Meteor.call('chefs.unfollow', id);
        Meteor.call('chefs.unfollowMy', id);
    }

    renderReceips() {
        if (Meteor.user()) {

            event.preventDefault();

            const r = Recipes.find({ userID: this.props.chef.userID });

            return r.map((recipe) => {

                return (
                    <div className="smallRecipe" onClick={() => { this.goRecipe(recipe._id) }}>
                        <div className="recipeContent">
                            <div className="title1">{recipe.name}</div>
                            <br />
                            <div className="txt1"><b>Description:</b> {recipe.description} </div>
                            <br />
                            <div className="rating">{recipe.rating}<img src="/favorite.png" alt="" /> </div>
                            //Bien por el uso de alt en las imagenes
                        </div>
                    </div>
                );
            });

        }
    }

    renderVideos() {
        if (Meteor.user()) {

            event.preventDefault();

            const r = Recipes.find({ userID: this.props.chef.userID });

            return r.map((recipe) => {
                var i = "https://www.youtube.com/embed/" + recipe.video + "?autoplay=0";
                //En ECMAScript6 se debe hacer uso de let o const para definir varibles
                return (
                    <div className="videoProfile">
                        <iframe src={i}>
                        </iframe>
                    </div>
                );
            });

        }
    }
    render() {
        return (
            <div className="chef">
                <div className="section bgProfile">
                    <div className="profileInfo">
                        <div className="title1">{this.props.chef.name}</div>
                        <br />
                        <div className="rating">
                            {this.props.chef.rating} <img src="/favorite.png" alt="" /></div>
                        <br />
                        <div className="txt1">
                            {this.props.chef.description}</div>
                    </div>
                </div>
                {this.props.user && (this.props.user._id != this.props.chef.userID && this.isFollowing()) ?

                    <button aria-label="Send new comment" onClick={this.follow(this.props.chef._id)} >Follow</button>

                    : ''}

                {this.props.user && (this.props.user._id != this.props.chef.userID && this.isFollowing()) ?

                    <button aria-label="Send new comment" onClick={this.unfollow(this.props.chef._id)} >Unfollow</button>

                    : ''}

                {this.renderReceips()}

                {this.renderVideos()}





            </div>
        );
    }
}

Chef.propTypes = {
    chef: PropTypes.object.isRequired,
    viewRecipe: PropTypes.func.isRequired,
};


