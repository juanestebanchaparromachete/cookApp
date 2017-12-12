import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

class Landing extends Component {
  render() {
    return (
      <div id="landing">
        <div className="section black bgImg1">
        <div className="intro">
          <div className="title1">
            the food venue
          </div>
          <div className="txt1">
            The perfect place to find and enjoy good recipes
          </div>
          <button onClick={this.props.recipes}>see all recipes</button>
        </div>
        </div>
        <div className="section">
          <div className="imgLeft"></div>
          <div className="about">
            <div className="title1">
                about us
            </div>
            <div className="txt1">
                We’re all about good recipes, and about quality home cooking that everyone can enjoy. 
                Whether you’re looking for some healthy inspiration or learning how to cook a decadent dessert, 
                we’ve trustworthy guidance for all your foodie needs.
            </div>
          </div>
        </div>
        <div className="section autoH bgImg2">
        <div className="recipes">
            <div className="title1">
                a recipe for every occasion... 
            </div>
            <div className="txt1">
                Our great variety of recipes will sure be enough for every occasion, family or friends you will be ready.
            </div>
            </div>
        </div>
        <div className="section">
            <div className="imgRight">
            </div>
            <div className="motto">
                <div className="title1">
                    our motto
                </div>
                <div className="txt1">
                    As well as helping you decide what to cook we can also help you to cook it. From tips on cookery techniques to facts and information about health and nutrition, we’ve a wealth of foodie know how for you to explore.
                </div>
            </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  recipes: PropTypes.func.isRequired,
};

export default Landing;
