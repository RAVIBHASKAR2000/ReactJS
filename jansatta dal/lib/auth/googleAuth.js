import { urlencoded } from 'express';
import { ExpressApp } from '@keystonejs-contrib/app-express';
import { GoogleAuthStrategy } from '@keystonejs/auth-passport';
import { env } from 'process';

const getUserData = serviceProfile => {
  const json = serviceProfile._json;
  if(!json) {
    return {
      name: serviceProfile.displayName,
      emails: serviceProfile.emails && serviceProfile.emails.length ? serviceProfile.emails[0].value : null,
      googleAvatar: serviceProfile.photos && serviceProfile.photos.length ? serviceProfile.photos[0].value : null,
    }
  }
  return {
    name: json.name,
    email: json.email,
    googleAvatar: json.picture,
  }
}

export default keystone => {
  const googleStrategy = keystone.createAuthStrategy({
    type: GoogleAuthStrategy,
    list: 'User',
    config: {
      idField: 'googleId',
      appId: env.GOOGLE_CLIENT_ID,
      appSecret: env.GOOGLE_CLIENT_SECRET,
      loginPath: '/auth/google',
      callbackPath: '/auth/google/callback',

      loginPathMiddleware: (req, res, next) => {
        // An express middleware executed before the Passport social signin flow
        // begins. Useful for setting cookies, etc.
        // Don't forget to call `next()`!
        next();
      },

      callbackPathMiddleware: (req, res, next) => {
        // An express middleware executed before the callback route is run. Useful
        // for logging, etc.
        // Don't forget to call `next()`!
        next();
      },

      // Called when there's no existing user for the given googleId
      // Default: resolveCreateData: () => ({})
      resolveCreateData: ({ createData, serviceProfile, actions: { pauseAuthentication } }, req, res) => {
        // If we don't have the right data to continue with a creation
        const userData = getUserData(serviceProfile);
        if (!createData.inviteCode) {
          // then we pause the flow
          pauseAuthentication();
          // And redirect the user to a page where they can enter the data.
          // Later, the `resolveCreateData()` method will be re-executed this
          // time with the complete data.
          res.redirect(`/signup-social?name=${userData.name}&email=${userData.email}`);
          return;
        }
        
        return { ...createData, ...userData, isVerifiedEmail: true };
      },

      // Once a user is found/created and successfully matched to the
      // googleId, they are authenticated, and the token is returned here.
      // NOTE: By default Keystone sets a `keystone.sid` which authenticates the
      // user for the API domain. If you want to authenticate via another domain,
      // you must pass the `token` as a Bearer Token to GraphQL requests.
      onAuthenticated: ({ token, item, isNewItem }, req, res) => {
        // console.log(token);
        res.redirect('/');
      },

      // If there was an error during any of the authentication flow, this
      // callback is executed
      onError: (error, req, res) => {
        console.error(error);
        res.redirect('/?error=Uh-oh');
      },
    },
  });

  const googleApp = new ExpressApp({}, app => {
    // Sample page to collect a name, submits to the completion step which will
    // create a user
    app.use(`/auth/google/signup`, urlencoded({ extended: true }), (req, res, next) => {
      if (req.method === 'POST') {
        const { inviteCode } = req.body;
        // Continue the authentication flow with additional data the user
        // submitted.
        // This data is merged into other data required by Keystone and will
        // trigger the resolveCreateData() method again.
        return googleStrategy.resumeAuthentication({ inviteCode }, req, res, next);
      }
      res.redirect('/');
      // res.send(`
      //     <form method="post">
      //       <label>
      //         What is your code? <input type="text" name="inviteCode" />
      //       </label>
      //       <button type="submit">Submit</button>
      //     </form>
      //   `);
    });
  });

  return { googleStrategy, googleApp }
}