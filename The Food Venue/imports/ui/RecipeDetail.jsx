import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      comment: '',
    };
    this.viewUser = this.viewUser.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }
  viewUser(idR) {
    this.props.goUser(idR);
  }
  updateRating(newVal) {
    this.setState({
      rating: newVal.target.value
    });
  }
  updateComment(newVal){
    this.setState({
      comment: newVal.target.value
    });
  } 
  comment(){
    Meteor.call('recipes.comment',this.props.curUser.username, this.state.comment, this.props.recipe._id)
    this.setState({
      comment: '',
    });
  }

  rate(){
    Meteor.call('recipes.rate',this.state.rating, this.props.recipe._id);
  }
  render() {
    return (
      <div>
        <div className="section bgRecipe">
          <div className="recipeDescription">
            <div className="title1">{this.props.recipe.name}</div>
            <div onClick={() => { this.viewUser(this.props.recipe.userID) }} className="txt1">{this.props.recipe.username}</div>
            <div className="rating">{this.props.recipe.rating}
              <img src="/favorite.png" alt="" /></div>
            <select name="rating" ref="ratevalueSelect"  value={this.state.rating} onChange={this.updateRating} ref="rating">
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="3">2</option>
              <option value="3">1</option>
            </select><button onClick={() => { this.rate() }} >RATE</button>
          </div>
        </div>
        <div id="recipDesc" className="section autoH">
          <ul>
            INGREDIENTS
            {this.props.recipe.ingredients.map((ingridient) => {
              return (<li>
                {ingridient.name} - {ingridient.amount} {ingridient.type}
              </li>)
            })}
          </ul>
          <iframe
            src={"https://www.youtube.com/embed/" + this.props.recipe.video + "?autoplay=0"}>
          </iframe>
          <div className="description">
            <div className="txt1">{this.props.recipe.description}</div>
          </div>
        </div>
        <div className="newComment">
          <input type="text" value={this.state.comment} onChange={this.updateComment} placeholder="Write a new comment..." />
          <button onClick={() => { this.comment() }} >SEND</button>
        </div>
        <div className="comments">
          {this.props.recipe.comments.map((comment) => {
            return (<div className="comm">
              <div className="title1">{comment.name}</div> <br />
              <div className="txt1">{comment.coment}</div>
            </div>)
          })}
        </div>

      </div>)
  }
}
RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired,
  goUser: PropTypes.func.isRequired,
  curUser: PropTypes.object.isRequired,
};

export default RecipeDetail;
