// @flow

import { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Job } from '../model';

export default mutationWithClientMutationId({
  name: 'RegisterJob',
  inputFields: {
    active: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
    salary: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    benefits: {
      type: GraphQLString,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    workload: {
      type: new GraphQLNonNull(GraphQLString),
    },
    localization: {
      type: new GraphQLNonNull(GraphQLString),
    },
    addinfo: {
      type: GraphQLString,
    },
    contract: {
      type: new GraphQLNonNull(GraphQLString),
    },
    areas: {
      type: GraphQLList(GraphQLString),
    },
    subareas: {
      type: GraphQLList(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({
    active,
    title,
    role,
    salary,
    benefits,
    description,
    workload,
    localization,
    addinfo,
    contract,
    areas,
    subareas,
  }) => {
    const job = new Job({
      active,
      title,
      role,
      salary,
      benefits,
      description,
      workload,
      localization,
      addinfo,
      contract,
      areas,
      subareas,
    });
    await job.save();

    return {
      error: null,
    };
  },
  outputFields: {
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
