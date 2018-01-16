import { graphql } from 'graphql';
import { schema } from '../../schema';
import { User } from '../../model';
import { generateToken } from '../../auth';
import { getContext, setupTest } from '../../../test/helper';

beforeEach(async () => await setupTest());

it('should not login if email is not in the database', async () => {
  //language=GraphQL
  const query = `
    mutation M {
      LoginEmail(input: {
        clientMutationId: "test1"
        email: "awesometest1@example.com"
        password: "awesometest1"
      }) {
        clientMutationId
        token
        error
      }     
    }
  `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { LoginEmail } = result.data;

  expect(LoginEmail.token).toBe(null);
  expect(LoginEmail.error).toBe('INVALID_EMAIL_PASSWORD');
});

it('should not login with wrong email', async () => {
  const user = new User({
    name: 'user',
    email: 'awesometest2@example.com',
    password: 'awesometest2',
    description: 'awesome desc',
    displayname: 'Awe-Some',
  });
  await user.save();

  //language=GraphQL
  const query = `
    mutation M {
      LoginEmail(input: {
        clientMutationId: "test2"
        email: "awesometestsdaw@example.com"
        password: "notawesome"
      }) {
        clientMutationId
        token
        error
      }     
    }
  `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { LoginEmail } = result.data;

  expect(LoginEmail.token).toBe(null);
  expect(LoginEmail.error).toBe('INVALID_EMAIL_PASSWORD');
});

it('should generate token when email and password is correct', async () => {
  const email = 'awesometest3@example.com';
  const password = 'awesometest3';

  const user = new User({
    name: 'user',
    email,
    password,
    description: 'awesome desc',
    displayname: 'AweSome',
  });
  await user.save();

  //language=GraphQL
  const query = `
    mutation M {
      LoginEmail(input: {
        clientMutationId: "test3"
        email: "${email}"
        password: "${password}"
      }) {
        clientMutationId
        token
        error
      }     
    }
  `;

  const rootValue = {};
  const context = getContext();

  const result = await graphql(schema, query, rootValue, context);
  const { LoginEmail } = result.data;

  expect(LoginEmail.token).toBe(generateToken(user));
  expect(LoginEmail.error).toBe(null);
});
