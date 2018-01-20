// @flow

import { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Job, User } from '../model';
import JobType from '../type/JobType';
import { JobLoader } from '../loader';

export default mutationWithClientMutationId({
  name: 'RegisterJob',
  inputFields: {
    user: {
      type: new GraphQLNonNull(GraphQLString),
    },
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
    user,
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
    let job = new Job({
      user,
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

    const userInModel = await User.findById(user);

    if (!userInModel) {
      return {
        jobid: null,
        error: 'USER_NOT_FOUND',
      };
    }

    job = await job.save();

    return {
      jobid: job._id,
      error: null,
    };
  },
  outputFields: {
    jobinfo: {
      type: JobType,
      resolve: (obj, args, context) => JobLoader.load(context, obj.jobid),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
