// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
// import { NodeInterface } from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Job',
  description: 'Job data',
  fields: () => ({
    id: globalIdField('Job'),
    _id: {
      type: GraphQLString,
      resolve: job => job._id,
    },
    user: {
      type: GraphQLString,
      resolve: job => job.user,
    },
    active: {
      type: GraphQLBoolean,
      resolve: job => job.active,
    },
    email: {
      type: GraphQLString,
      resolve: job => job.email,
    },
    title: {
      type: GraphQLString,
      resolve: job => job.title,
    },
    salary: {
      type: GraphQLFloat,
      resolve: job => job.salary,
    },
    benefits: {
      type: GraphQLString,
      resolve: job => job.benefits,
    },
    description: {
      type: GraphQLString,
      resolve: job => job.description,
    },
    workload: {
      type: GraphQLString,
      resolve: job => job.workload,
    },
    localization: {
      type: GraphQLString,
      resolve: job => job.localization,
    },
    addinfo: {
      type: GraphQLString,
      resolve: job => job.addinfo,
    },
    contract: {
      type: GraphQLString,
      resolve: job => job.contract,
    },
    areas: {
      type: GraphQLList(GraphQLString),
      resolve: job => job.areas,
    },
    subareas: {
      type: GraphQLList(GraphQLString),
      resolve: job => job.subareas,
    },
  }),
});
