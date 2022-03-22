// Access control functions
const userIsAuth = ({ authentication: { item: user } }) => Boolean(user);
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = userIsAdmin(auth);
  const isOwner = userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const userIsCurrentAuth = userOwnsItem

export { userIsAdmin, userIsAuth, userOwnsItem, userIsAdminOrOwner, userIsCurrentAuth };

// Read: public / Write: admin
export const DEFAULT_LIST_ACCESS = {
  create: userIsAdmin,
  read: userIsAuth,
  update: userIsAdmin,
  delete: userIsAdmin,
};