import { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { Job } from '../model';
import JobType from '../type/JobType';
import { JobLoader } from '../loader';

export default mutationWithClientMutationId({
  name: 'UpdateJob',
  inputFields: {
    id: {
      type: GraphQLString,
    },
    active: {
      type: GraphQLBoolean,
    },
    email: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    salary: {
      type: GraphQLFloat,
    },
    benefits: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    workload: {
      type: GraphQLString,
    },
    localization: {
      type: GraphQLString,
    },
    addinfo: {
      type: GraphQLString,
    },
    contract: {
      type: GraphQLString,
    },
    areas: {
      type: GraphQLList(GraphQLString),
    },
    subareas: {
      type: GraphQLList(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({
    id,
    active,
    email,
    title,
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
    const job = await Job.findOne({ id });

    job.active = active !== null ? active : job.active;
    job.email = email !== null ? email : job.email;
    job.title = title !== null ? title : job.title;
    job.salary = salary !== null ? salary : job.salary;
    job.description = description !== null ? description : job.description;
    job.workload = workload !== null ? workload : job.workload;
    job.localization = localization !== null ? localization : job.localization;
    job.contract = contract !== null ? contract : job.contract;
    job.benefits = benefits;
    job.addinfo = addinfo;
    job.areas = areas;
    job.subareas = subareas;
    await job.save();

    return {
      jobid: job.id,
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
