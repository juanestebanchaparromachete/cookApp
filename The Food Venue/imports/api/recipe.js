import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('recipes', function recipesPublication() {
    return Recipes.find({});
  });
}

//Por orden es aconsejable recibir toda la información a guardar dentro de un objeto, en vez de tener muchos parámetros.
Meteor.methods({
    'recipes.insert'(userId, name, description, process,video, ingredients,typeOfFood , country) {
        check(name, String);
    
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        Recipes.insert({
          name,
          userID: userId,
          username: Meteor.users.findOne(this.userId).username,
          createdAt: new Date(),
          description,
          process,
          comments: [],
          rating: 0,
          video,
          ingredients,
          typeOfFood,
          country,
        });
      }
  ,'recipes.comment'(nameUser, text, recipeId) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    var comment = {
        coment: text,
        name: nameUser,
    };
    Recipes.update(recipeId, { $addToSet: { comments: comment } });
  }
,
'recipes.rate'( vote, recipeId) {
    check(recipeId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const chef2 = Recipes.findOne(recipeId);
    var rate = ((chef2.rating + vote)/2) ;
   
    Recipes.update(recipeId, { $set: { rating: rate } });
  }
,
});
