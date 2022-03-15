export const isImage = (s: string) => imageExtensions.some(_ => s.endsWith(_));
export const isVideo = (s: string) => videoExtensions.some(_ => s.endsWith(_));

export const isImageContentType = (s: string) => imageMediaTypes.some(_ => s.includes(_));
export const isVideoContentType = (s: string) => videoMediaTypes.some(_ => s.includes(_));

/**
 * there are some bad urls like https://rarible.mypinata.cloud/
 * let's add them to this list so we can filter them out
 */
export const badUrls = ['https://rarible.mypinata.cloud/'];

const imageExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg',
  'webp',
  'apng',
  'bmp',
  'ico',
  'pcx',
  'pict',
  'pgm',
  'ppm',
  'psd',
  'tga',
  'xbm',
  'xpm',
  'xwd',
  '.svg+xml',
];

const videoExtensions = ['mp4', 'm4v', 'mov', 'qt', 'webm', 'ogv', 'mkv', 'wmv', 'flv', 'avi'];

const imageMediaTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/webp',
  'image/apng',
  'image/bmp',
  'image/x-icon',
  'image/x-ms-bmp',
  'image/x-pcx',
  'image/x-pict',
  'image/x-portable-anymap',
  'image/x-portable-bitmap',
  'image/x-portable-graymap',
  'image/x-portable-pixmap',
  'image/x-rgb',
  'image/x-tga',
  'image/x-xbitmap',
  'image/x-xpixmap',
  'image/x-xwindowdump',
];

const videoMediaTypes = [
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/ogg',
  'video/x-matroska',
  'video/x-ms-wmv',
  'video/x-flv',
];
