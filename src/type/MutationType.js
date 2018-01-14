// @flow

import { GraphQLObjectType } from 'graphql';

// User
import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';

// Job
import RegisterJob from '../mutation/RegisterJobMutation';
import UpdateJob from '../mutation/UpdateJobMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,

    RegisterJob,
    UpdateJob,
  }),
});
