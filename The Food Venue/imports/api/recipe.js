import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
  Meteor.publish('recipes', function recipesPublication() {
    return Recipes.find({});
  });
}

Meteor.methods({
    /* srojas19: Aunque no afecta la funcionalidad, se debe procurar recibir un objeto con todos los
       atributos por parametro, para que sea mas facil mantener consistencia entre distintos
       componentes de la aplicacion
       ej: 'recipes.insert' (recipe) { ... }
    */
    'recipes.insert'(userId, name, description, process,video, ingredients,typeOfFood , country) {
        check(name, String);
    
        // srojas19: Corrección en revisión de id de usuario
        if (!this.userId()) {
          throw new Meteor.Error('not-authorized');
        }
    
        // srojas19: De recibir la receta como objeto por parametro:
        // Recipes.insert({recipe, ...}
        Recipes.insert({
          name,
          userID: userId,
          username: Meteor.user().username, // srojas19: Mejora para acceder al username del usuario en sesion
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

    // srojas19: Corrección en revisión de id de usuario
    if (!this.userId()) {
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
    // srojas19: Corrección en revisión de id de usuario
    if (!this.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const chef2 = Recipes.findOne(recipeId);
    
    // srojas19: Sospecho que este rating esta mal calculado
    var rate = ((chef2.rating + vote)/2) ;
   
    Recipes.update(recipeId, { $set: { rating: rate } });
  }
,
});
