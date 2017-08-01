const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const _ = require('lodash');

const users = [
  { id: '20', firstName: 'Bill', age: 30 },
  { id: '30', firstName: 'Jill', age: 40 },
  { id: '40', firstName: 'John', age: 50 }
];

const companies = [
  { id: '200', name: 'Hilton', description: 'NTTData Account' },
  { id: '300', name: 'Apple', description: 'iPhone' },
  { id: '400', name: 'Google', description: 'Search' }
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // return _.find(companies, { id: args.id });
        return _.find(companies, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});
