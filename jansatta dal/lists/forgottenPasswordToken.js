
import { Text, DateTime, Relationship } from '@keystonejs/fields';
import { atTracking, byTracking } from '@keystonejs/list-plugins';

import { userIsAdmin } from '../lib/list/access';
import { sendEmail } from '../lib/emails';

export const ForgottenPasswordToken = {
  access: {
    create: true,
    read: true,
    update: userIsAdmin,
    delete: userIsAdmin,
  },
  fields: {
    user: {
      type: Relationship,
      ref: 'User',
      access: {
        read: userIsAdmin,
      },
    },
    token: {
      type: Text,
      isRequired: true,
      isUnique: true,
      access: {
        read: userIsAdmin,
      },
    },
    requestedAt: { type: DateTime, isRequired: true },
    accessedAt: { type: DateTime },
    expiresAt: { type: DateTime, isRequired: true },
  },
  plugins: [atTracking(), byTracking()],
  hooks: {
    afterChange: async ({ updatedItem, existingItem, actions: { query } }) => {
      if (existingItem) return null;

      const now = new Date().toISOString();

      const { errors, data } = await query(
        `
        query GetUserAndToken($user: ID!, $now: DateTime!) {
          User( where: { id: $user }) {
            id
            email
          }
          allForgottenPasswordTokens( where: { user: { id: $user }, expiresAt_gte: $now }) {
            token
            expiresAt
          }
        }
      `,
        { skipAccessControl: true, variables: { user: updatedItem.user.toString(), now } }
      );

      if (errors) {
        console.error(errors, `Unable to construct password updated email.`);
        return;
      }

      const { allForgottenPasswordTokens, User } = data;
      const forgotPasswordKey = allForgottenPasswordTokens[0].token;
      const url = process.env.SERVER_URL || 'http://localhost:3000';

      const props = {
        forgotPasswordUrl: `${url}/change-password?key=${forgotPasswordKey}`,
        recipientEmail: User.email,
      };

      const options = {
        subject: 'Request for password reset',
        to: User.email,
        from: process.env.MAILGUN_FROM,
        domain: process.env.MAILGUN_DOMAIN,
        apiKey: process.env.MAILGUN_API_KEY,
      };

      await sendEmail('forgot-password.jsx', props, options);
    },
  },
};

export const ForgottenPasswordSchema = {
  mutations: [
    {
      schema: 'startPasswordRecovery(email: String!): ForgottenPasswordToken',
      resolver: async (obj, { email }, context, info, { query }) => {
        const token = uuid();

        const tokenExpiration =
          parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY) || 1000 * 60 * 60 * 24;

        const now = Date.now();
        const requestedAt = new Date(now).toISOString();
        const expiresAt = new Date(now + tokenExpiration).toISOString();

        const { errors: userErrors, data: userData } = await query(
          `
            query findUserByEmail($email: String!) {
              allUsers(where: { email: $email }) {
                id
                email
              }
            }
          `,
          { variables: { email: email }, skipAccessControl: true }
        );

        if (userErrors || !userData.allUsers || !userData.allUsers.length) {
          console.error(
            userErrors,
            `Unable to find user when trying to create forgotten password token.`
          );
          return;
        }

        const userId = userData.allUsers[0].id;

        const result = {
          userId,
          token,
          requestedAt,
          expiresAt,
        };

        const { errors } = await query(
          `
            mutation createForgottenPasswordToken(
              $userId: ID!,
              $token: String,
              $requestedAt: DateTime,
              $expiresAt: DateTime,
            ) {
              createForgottenPasswordToken(data: {
                user: { connect: { id: $userId }},
                token: $token,
                requestedAt: $requestedAt,
                expiresAt: $expiresAt,
              }) {
                id
                token
                user {
                  id
                }
                requestedAt
                expiresAt
              }
            }
          `,
          { variables: result, skipAccessControl: true }
        );

        if (errors) {
          console.error(errors, `Unable to create forgotten password token.`);
          return;
        }

        return true;
      },
    },
    {
      schema: 'changePasswordWithToken(token: String!, password: String!): User',
      resolver: async (obj, { token, password }, context, info, { query }) => {
        const now = Date.now();

        const { errors, data } = await query(
          `
            query findUserFromToken($token: String!, $now: DateTime!) {
              passwordTokens: allForgottenPasswordTokens(where: { token: $token, expiresAt_gte: $now }) {
                id
                token
                user {
                  id
                }
              }
            }
          `,
          { variables: { token, now }, skipAccessControl: true }
        );

        if (errors || !data.passwordTokens || !data.passwordTokens.length) {
          console.error(errors, `Unable to find token`);
          throw errors.message;
        }

        const user = data.passwordTokens[0].user.id;
        const tokenId = data.passwordTokens[0].id;

        const { errors: passwordError } = await query(
          `mutation UpdateUserPassword($user: ID!, $password: String!) {
            updateUser(id: $user, data: { password: $password }) {
              id
            }
          }
        `,
          { variables: { user, password }, skipAccessControl: true }
        );

        if (passwordError) {
          console.error(passwordError, `Unable to change password`);
          throw passwordError.message;
        }

        await query(
          `mutation DeletePasswordToken($tokenId: ID!) {
            deleteForgottenPasswordToken(id: $tokenId) {
              id
            }
          }
        `,
          { variables: { tokenId }, skipAccessControl: true }
        );

        return true;
      },
    },
  ],
};
