import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chefs = new Mongo.Collection('chefs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('chefs', function recipesPublication() {
    return Chefs.find({});
  });
}

//Al igual que en el otro archivo, se aconseja reducir todos los parámetros a un objeto.
Meteor.methods({
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
    
            console.log(id);
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
            throw new Meteor.Error('User not log in');
          }
          const chef = Chefs.findOne({userID:this.userId});
          
          const newFollow = {
            username: Meteor.users.findOne(this.userId).username,
            createdAt: new Date(),
            userID:chef._id,
          }
         
          Chefs.update(chefId, { $addToSet: { followers: newFollow } });
        },'chefs.unfollow'(chefId) {
            check(userId, String);
            check(userName, String);
        
            
        
            if (!Meteor.userId()) {
              throw new Meteor.Error('User not log in');
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
              throw new Meteor.Error('User not log in');
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
