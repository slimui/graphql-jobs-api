// @flow
import DataLoader from 'dataloader';
import { Job as JobModel } from '../model';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { ConnectionArguments } from 'graphql-relay';
import type { GraphQLContext } from '../TypeDefinition';

type JobType = {
  id: string,
  _id: string,
  active: boolean,
  title: string,
  role: string,
  salary: number,
  benefits: string,
  description: string,
  workload: string,
  localization: string,
  addinfo: string,
  contract: string,
  areas: Array<string>,
  subareas: Array<string>,
};

export default class Job {
  id: string;
  _id: string;
  active: boolean;
  title: string;
  role: string;
  salary: number;
  benefits: string;
  description: string;
  workload: string;
  localization: string;
  addinfo: string;
  contract: string;
  areas: Array<string>;
  subareas: Array<string>;

  constructor(data: JobType, { job }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.active = data.active;
    this.title = data.title;
    this.role = data.role;
    this.salary = data.salary;
    this.benefits = data.benefits;
    this.description = data.description;
    this.workload = data.workload;
    this.localization = data.localization;
    this.addinfo = data.addinfo;
    this.contract = data.contract;
    this.areas = data.areas;
    this.subareas = data.subareas;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(JobModel, ids));

const viewerCanSee = (context, data) => {
  // Anyone can see another job
  return true;
};

export const load = async (context: GraphQLContext, id: string): Promise<?Job> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.JobLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Job(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => {
  return dataloaders.JobLoader.clear(id.toString());
};
