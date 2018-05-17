const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const user1Id = new ObjectId();
const user2Id = new ObjectId();

const users = [{
    _id: user1Id,
    email: 'avish1@test.com',
    password: 'user1pass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: user1Id, access: 'auth'}, 'abc123').toString()
    }]
  },
  {
    _id: user2Id,
    email: 'avish2@test.com',
    password: 'user2pass'
  }];


const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completedAt: 333444,
  completed: true
}];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const user1 = new User(users[0]).save();
    const user2 = new User(users[1]).save();

    return Promise.all([user1, user2])
  }).then(() => done());
};

module.exports = {todos, users, populateTodos, populateUsers};