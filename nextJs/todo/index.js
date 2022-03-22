const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { GraphQLApp } = require('@keystonejs/app-graphql');

const TodoSchema = require('./lists/Todo.js');
const UserSchema = require('./lists/User.js');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');

const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/todo' }),
});

keystone.createList('Todo', TodoSchema);
keystone.createList('User', UserSchema);

  module.exports = {
    keystone,
    apps: [new GraphQLApp(),
      new AdminUIApp({ name: 'todo', enableDefaultRoute: true }),],
  };

