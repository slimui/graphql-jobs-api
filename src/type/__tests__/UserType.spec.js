import { graphql } from 'graphql';
import { schema } from '../../schema';
import { User } from '../../model';
import { getContext, setupTest } from '../../../test/helper';

beforeEach(async () => await setupTest());

it('should not show email of other users', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
    password: '123',
    description: 'user desc',
    displayname: 'user Display',
  });
  await user.save();

  const user1 = new User({
    name: 'awesome',
    email: 'awesome@example.com',
    password: '123',
    description: 'awesome desc',
    displayname: 'Awe-some',
  });
  await user1.save();

  //language=GraphQL
  const query = `
    query Q {
      users(first: 2) {
        edges {
          node {
            _id
            name
            email
            active
            description
            displayname
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext({ user });

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.users;

  expect(edges[0].node.name).toBe(user1.name);
  expect(edges[0].node.email).toBe(null);
  expect(edges[0].node.description).toBe(null);
  expect(edges[0].node.displayname).toBe(null);

  expect(edges[1].node.name).toBe(user.name);
  expect(edges[1].node.email).toBe(user.email);
  expect(edges[1].node.description).toBe(user.description);
  expect(edges[1].node.displayname).toBe(user.displayname);
});
