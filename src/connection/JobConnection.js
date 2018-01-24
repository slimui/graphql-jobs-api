// @flow

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import JobType from '../type/JobType';

export default connectionDefinitions({
  name: 'Job',
  nodeType: JobType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
