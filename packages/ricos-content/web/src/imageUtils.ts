import imageClientAPI from 'image-client-api/dist/imageClientSDK';
import { ComponentData } from './types';

const WIX_STATIC_URL = 'https://static.wixstatic.com';
const DEFAULT = {
  SIZE: 300,
  QUALITY: 5,
  TYPE: 'preload',
};

const PRELOAD = {
  SIZE: 700,
  QUALITY: 10,
};
const resize = (w: number, h: number, rw: number, rh: number) => {
  if (rw > w && rh > h) {
    return { width: w, height: h };
  }
  return { width: rw, height: rh };
};

type Dimension = { w: number; h: number };

const createUrl = (
  src: ComponentData['src'],
  rw?: number,
  rh?: number,
  rq?: number,
  type = DEFAULT.TYPE
) => {
  if (type === 'preload') {
    return createPreloadUrl(src, rw, rh, rq);
  }
  if (type === 'quailtyPreload') {
    return createQuailtyPreloadUrl(src);
  }
  return createHiResUrl(src, rw, rh, rq);
};

const createPreloadUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw = DEFAULT.SIZE,
  rh = DEFAULT.SIZE,
  rq = DEFAULT.QUALITY
) => {
  if (fileName) {
    const { width, height } = resize(w, h, rw, rh);
    const H = Math.ceil(height); //make sure no sterching will occur
    const W = Math.ceil(width);
    const format = getImageFormat(fileName);
    return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/w_${W},h_${H},al_c,q_${rq}/file${format}`;
  }
};

const createQuailtyPreloadUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw = PRELOAD.SIZE,
  rq = PRELOAD.QUALITY
) => {
  if (fileName) {
    const ceilDim = (dim: Dimension) => ({ w: Math.ceil(dim.w), h: Math.ceil(dim.h) });
    const ratio = h / w;
    const tDim: Dimension = ceilDim({ w: rw, h: rw * ratio });
    return `${WIX_STATIC_URL}/media/${fileName}/v1/fit/w_${tDim.w},h_${
      tDim.h
    },al_c,q_${rq}/file${getImageFormat(fileName)}`;

    // let src = imageClientAPI.getScaleToFitImageURL(fileName, w, h, W, H, { quality: rq });

    // const extensionIndex = src.lastIndexOf('.webp');
    // if (extensionIndex > -1) {
    //   src = src.substring(0, extensionIndex) + format;
    // }

    // return src;
  }
  return '';
};

const createHiResUrl = (
  { file_name: fileName, width: w, height: h }: ComponentData['src'] = {},
  rw = DEFAULT.SIZE,
  rh = DEFAULT.SIZE,
  rq = DEFAULT.QUALITY
) =>
  fileName ? imageClientAPI.getScaleToFitImageURL(fileName, w, h, rw, rh, { quality: rq }) : '';

const getImageFormat = (fileName: string) => {
  const matches = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/i.exec(fileName);
  return matches ? matches[0] : '.jpg';
};

const getImageSrc = (
  src: ComponentData['src'],
  helpers?: { getImageUrl: ({ file_name }: { file_name: string }) => string },
  options: {
    requiredWidth?: number;
    requiredHeight?: number;
    requiredQuality?: number;
    imageType?: string;
  } = {}
) => {
  if (typeof src === 'object') {
    if (src.source) {
      if (src.source === 'static') {
        if (src.url) {
          return src.url;
        } else {
          console.error('must provide src url when using static image source!', src); //eslint-disable-line no-console
        }
      } else if (src.source === 'custom') {
        if (helpers && helpers.getImageUrl) {
          return helpers.getImageUrl({ file_name: src.file_name }); //eslint-disable-line camelcase
        } else {
          console.error('must provide getImageUrl helper when using custom image source!', src); //eslint-disable-line no-console
        }
      }
    } else if (src.file_name) {
      const url = createUrl(
        src,
        options.requiredWidth,
        options.requiredHeight,
        options.requiredQuality,
        options.imageType
      );
      return url;
    }
  }

  return src;
};

export { getImageSrc, DEFAULT as WIX_MEDIA_DEFAULT };
