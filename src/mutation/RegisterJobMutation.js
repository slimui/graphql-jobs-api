// @flow

import { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Job } from '../model';
import JobType from '../type/JobType';
import { JobLoader } from '../loader';

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
    let job = new Job({
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
    job = await job.save();

    console.log(job);

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
