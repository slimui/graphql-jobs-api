// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    active: {
      type: GraphQLBoolean,
      resolve: user => user.active,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    displayname: {
      type: GraphQLString,
      resolve: user => user.displayname,
    },
    description: {
      type: GraphQLString,
      resolve: user => user.description,
    },
  }),
  interfaces: () => [NodeInterface],
});
