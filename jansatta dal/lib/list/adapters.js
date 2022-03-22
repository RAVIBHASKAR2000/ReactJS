import { CloudinaryAdapter } from '@keystonejs/file-adapters';
import { LocalFileAdapter } from '@keystonejs/file-adapters';
import { staticRoute, staticPath, distDir } from '../config';

const dev = process.env.NODE_ENV !== 'production';


export const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
});

export const avatarFileAdapter = new LocalFileAdapter({
  src: `${staticPath}/avatars`,
  path: `${staticRoute}/avatars`,
});


export const fileAdapter = new LocalFileAdapter({
  src: `${dev ? '' : `${distDir}/`}${staticPath}/uploads`,
  path: `${staticRoute}/uploads`,
});