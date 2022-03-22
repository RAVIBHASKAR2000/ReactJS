import { createHash } from "crypto";

import { Text, Checkbox, Password, Slug, File, Url, Virtual } from '@keystonejs/fields';
import { Wysiwyg } from '@keystonejs/fields-wysiwyg-tinymce';
import { atTracking, byTracking } from '@keystonejs/list-plugins';

import { userIsAdmin, userIsAdminOrOwner, userIsAuth } from '../lib/list/access';
import { cloudinaryAdapter, avatarFileAdapter } from '../lib/list/adapters';
import { sendEmail } from '../lib/emails';

export const User = {
  access: {
    read: userIsAuth,
    update: userIsAdminOrOwner,
    create: true,
    delete: userIsAdmin,
    auth: true,
  },
  fields: {
    name: { type: Text, isRequired: true },
    key: { type: Slug, isUnique: true },
    email: { type: Text, isRequired: true, isUnique: true },
    password: { type: Password },
    isVerifiedEmail: { type: Checkbox, label: "Has a verified email address", access: { update: userIsAdmin } },
    emailVerificationKey: { type: Text, hidden: true },
    image: { type: File, adapter: avatarFileAdapter },
    twitter: { type: Text, width: "short" },
    bio: { type: Wysiwyg },
    mobile: { type: Text, label: "mobile number", min: 9, max: 11 },
    gravatar: { type: Text, noedit: true },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: { create: userIsAdmin, update: userIsAdmin },
    },
    url: {
      type: Virtual,
      resolver: item => (`/member/${item.key}`)
    },
    googleId: { type: Text, access: { create: userIsAdmin, update: userIsAdmin } },
    googleAvatar: { type: Url },
  },
  // hooks
  hooks: {
    resolveInput: ({
      operation,
      existingItem,
      originalInput,
      resolvedData,
      context,
      actions,
    }) => {

      // Input resolution logic. Object returned is used in place of `resolvedData`.
      if (originalInput.email) {
        if (existingItem && existingItem.email === originalInput.email) return resolvedData;
        resolvedData.gravatar = createHash("md5").update(originalInput.email.toLowerCase().trim()).digest("hex")
      }      
      return resolvedData;
    },
    afterDelete: ({ existingItem }) => {
      if (existingItem.image) {
        fileAdapter.delete(existingItem.image);
      }
    },
  },
  plugins: [atTracking(), byTracking()],
  adminConfig: {
    defaultColumns: 'name, email, isAdmin'
  },
  // List-level access controls
};