import { createHash } from "crypto";

import { Text, Checkbox, DateTime, CalendarDay, Slug, File, Url, Virtual, Select, Relationship } from '@keystonejs/fields';
import { Wysiwyg } from '@keystonejs/fields-wysiwyg-tinymce';
import { atTracking, byTracking } from '@keystonejs/list-plugins';

import { userIsAdmin, userIsAdminOrOwner, userIsAuth } from '../lib/list/access';
import { cloudinaryAdapter, avatarFileAdapter } from '../lib/list/adapters';
import { sendEmail } from '../lib/emails';

export const Martyr = {
  access: {
    read: true,
    update: userIsAdminOrOwner,
    create: userIsAuth,
    delete: userIsAdmin,
  },
  fields: {
    name: { type: Text, isRequired: true },
    key: { type: Slug, isUnique: true },
    image: { type: File, adapter: avatarFileAdapter },
    imageCredit: { type: Url },
    heroImage: { type: File, adapter: avatarFileAdapter },
    heroImageCredit: { type: Url },
    summary: { type: Wysiwyg },
    content: { type: Wysiwyg },
    source: { type: Url },
    publishStatus: { type: Select, options: 'draft, published', isIndexed: true },
    whenPublished: { type: DateTime },
    submittedBy: { type: Relationship, ref: 'User' },
    born: { type: CalendarDay },
    bornLocation: { type: Text, isMultiline: true },
    bornComment: { type: Wysiwyg },
    died: { type: CalendarDay },
    diedLocation: { type: Text, isMultiline: true },
    diedComment: { type: Wysiwyg },
    
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