import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chefs = new Mongo.Collection('chefs');

if (Meteor.isServer) { 
  Meteor.publish('chefs', function recipesPublication() {
    return Chefs.find({});
  });
}

Meteor.methods({
  
    // srojas19: Aunque no afecta la funcionalidad, se debe procurar recibir un objeto con todos los
    // atributos por parametro, para que sea mas facil mantener consistencia entre distintos
    // componentes de la aplicacion
    // ej: 'chefs.insert' (chef) { ... }
    'chefs.insert'( name, country, email, phone,age,gender, description) {
        check(name, String);
    
        if (!this.userId) {
          throw new Meteor.Error('not-authorized');
        }
    
        Chefs.insert({
          name,
          userID: this.userId,
          username: Meteor.users.findOne(this.userId).username,
          createdAt: new Date(),
          country,
          email,
          phone,
          age,
          gender,
          description,
          rating:0,
          followers:[],
          following:[],
        });
      }
  , 'chefs.searchByUserName' (id) {
   
            // srojas19: Eliminado console.log para producción
            if (!id) {
                throw new Meteor.Error('not-authorized');
            }
    
            return Exercisers.findOne({
                userID: id
            });
    
        },
        'chefs.follow'(chefId) {
          check(userId, String);
          check(userName, String);
        
          if (!Meteor.userId()) {
            //srojas19: Correccion gramatical
            throw new Meteor.Error('User not logged in');
          }
          const chef = Chefs.findOne({userID:this.userId});
          
          const newFollow = {
            // srojas19: Corrección para acceder al username del usuario en sesion
            username: Meteor.user().username,
            createdAt: new Date(),
            userID:chef._id,
          }
         
          Chefs.update(chefId, { $addToSet: { followers: newFollow } });
        },'chefs.unfollow'(chefId) {
            check(userId, String);
            check(userName, String);
            
            if (!Meteor.userId()) {
              throw new Meteor.Error('User not logged in');
            }
            const chef2 = Chefs.findOne(chefId);
            
            const chef = Chefs.findOne({userID:this.userId});

            for (i = 0; i < chef2.followers.length; i++) {
                if (chef2.followers[i].userID == chef._id) {
                  chef2.followers.splice(i, 1);
                  break;
                }
            }

            Chefs.update(chefId, { $Set: { followers: chef.following } });
          },
          'chefs.followMy'(chefId) {
            check(userId, String);
            check(userName, String);
           
            if (!Meteor.userId()) {
              throw new Meteor.Error('User not logged in');
            }
            const chef = Chefs.findOne({userID:this.userId});
            const chef2 = Chefs.findOne(chefId);
            const newFollow = {
              username: Meteor.users.findOne(chef2.userID).username,
              createdAt: new Date(),
              userID:chef2._id,
            }
           
            Chefs.update(chef._id, { $addToSet: { following: newFollow } });
          },'chefs.unfollowMy'(chefId) {
              check(userId, String);
              check(userName, String);
          
              
              const chef = Chefs.findOne({userID:this.userId});
              
              if (!Meteor.userId()) {
                throw new Meteor.Error('User not log in');
              }
             
              for (i = 0; i < chef.following.length; i++) {
                  if (chef.following[i].userID == chefId ) {
                    
                    chef.following.splice(i, 1);
                    break;
                  }
                }
  
              Chefs.update(chef._id, { $Set: { followers: chef.following } });
            }
});
