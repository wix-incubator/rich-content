import { ImageComponentData, VideoComponentData } from 'wix-rich-content-common';
import { GALLERY_LAYOUTS, layoutData } from '../lib/layout-data-provider';

/* eslint-disable camelcase */

export const GALLERY_ITEMS_TYPES = Object.freeze({
  IMAGE: 'image',
  VIDEO: 'video',
});

const HORIZONTAL_LAYOUTS = Object.freeze([
  GALLERY_LAYOUTS.THUMBNAIL,
  GALLERY_LAYOUTS.SLIDER,
  GALLERY_LAYOUTS.SLIDESHOW,
  GALLERY_LAYOUTS.COLUMN,
  GALLERY_LAYOUTS.FULLSIZE,
]);

export const sampleItems = [1, 2, 3].map(i => {
  return {
    metadata: {
      height: 10,
      width: 10,
    },
    orderIndex: i,
    itemId: 'sampleItem-' + i,
    url:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAA1JREFUCB1jePv27X8ACVkDxyMHIvwAAAAASUVORK5CYII=', //eslint-disable-line
  };
});

export const DEFAULTS = Object.freeze({
  items: [],
  styles: {
    galleryLayout: GALLERY_LAYOUTS.GRID,
    ...layoutData[GALLERY_LAYOUTS.GRID],
  },
  config: {
    alignment: 'center',
    size: 'content',
    layout: 'small',
    spacing: 0,
  },
});

export const LAYOUT_FIXED_STYLES = {
  [GALLERY_LAYOUTS.COLLAGE]: {
    galleryType: 'Columns',
    imageMargin: 5,
  },
  [GALLERY_LAYOUTS.MASONRY]: {
    imageMargin: 5,
    isVertical: false,
    gridStyle: 0,
  },
  [GALLERY_LAYOUTS.GRID]: {
    imageResize: false,
    gridStyle: 1,
    galleryImageRatio: 2,
    imageMargin: 5,
  },
  [GALLERY_LAYOUTS.THUMBNAIL]: {
    arrowsSize: 23,
    thumbnailSize: 120,
    floatingImages: 0,
  },
  [GALLERY_LAYOUTS.SLIDER]: {
    arrowsSize: 23,
    imageMargin: 5,
  },
  [GALLERY_LAYOUTS.SLIDESHOW]: {
    arrowsSize: 23,
    floatingImages: 0,
    slideshowInfoSize: 0,
  },
  [GALLERY_LAYOUTS.PANORAMA]: {
    hasThumbnails: false,
    imageMargin: 5,
  },
  [GALLERY_LAYOUTS.COLUMN]: {
    arrowsSize: 23,
    hasThumbnails: false,
    imageMargin: 5,
  },
  [GALLERY_LAYOUTS.FULLSIZE]: {
    arrowsSize: 23,
    floatingImages: 0,
    slideshowInfoSize: 0,
  },
};

export const FIXED_STYLES = {
  gallerySizeType: 'px',
  enableInfiniteScroll: true,
  titlePlacement: 'SHOW_ON_HOVER',
  allowHover: true,
  itemClick: 'link',
  fullscreen: false,
  loveButton: false,
  allowSocial: false,
  allowDownload: false,
  mobileSwipeAnimation: 'NO_EFFECT',
  thumbnailSize: 120,
  gotStyleParams: true,
  showVideoPlayButton: true,
  videoPlay: 'onClick',
};

export const createImageItem = (
  img: ImageComponentData & HTMLImageElement,
  itemId: string,
  preloadImage: boolean | undefined
) => {
  return {
    metadata: {
      type: 'image',
      height: img.height,
      width: img.width,
    },
    itemId,
    url: preloadImage ? img.src : img.file_name,
    tempData: preloadImage,
  };
};

export const createVideoItem = (video: VideoComponentData, itemId: string) => {
  const {
    thumbnail: { pathname: poster, width, height },
  } = video;
  return {
    metadata: {
      type: 'video',
      height: video.height || height,
      width: video.width || width,
      poster,
    },
    itemId,
    url: video.pathname,
  };
};

export const isHorizontalLayout = ({ galleryLayout, oneRow }) =>
  HORIZONTAL_LAYOUTS.indexOf(galleryLayout) > -1 || oneRow;
