export enum GALLERY_LAYOUTS {
  EMPTY = -1,
  COLLAGE,
  MASONRY,
  GRID,
  THUMBNAIL,
  SLIDER,
  SLIDESHOW,
  PANORAMA,
  COLUMN,
  MAGIC,
  FULLSIZE,
  BRICKS,
  MIX,
  ALTERNATE,
}

export const layoutData = {
  [GALLERY_LAYOUTS.COLLAGE]: {
    showArrows: false,
    isVertical: true,
    oneRow: false,
    galleryType: 'Columns',
    imageMargin: 5,
    gallerySizePx: '300',
    allowHover: true,
  },
  [GALLERY_LAYOUTS.MASONRY]: {
    showArrows: false,
    numberOfImagesPerRow: 0,
    imageMargin: 5,
    gallerySizePx: '300',
    gridStyle: 0,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.GRID]: {
    showArrows: false,
    imageResize: false,
    galleryImageRatio: 2,
    numberOfImagesPerRow: 3,
    imageMargin: 5,
    cubeType: 'fill',
    cubeRatio: 1,
    isVertical: true,
    oneRow: false,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.THUMBNAIL]: {
    showArrows: true,
    arrowsSize: 23,
    galleryThumbnailsAlignment: 'bottom',
    floatingImages: 0,
    thumbnailSpacings: 2.5,
    thumbnailSize: 120,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.SLIDER]: {
    showArrows: true,
    arrowsSize: 23,
    imageMargin: 5,
    cubeType: 'fit',
    cubeRatio: '16/9',
    allowHover: true,
  },
  [GALLERY_LAYOUTS.SLIDESHOW]: {
    showArrows: true,
    arrowsSize: 23,
    cubeType: 'fit',
    floatingImages: 0,
    slideshowInfoSize: 0,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.PANORAMA]: {
    showArrows: false,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    imageMargin: 5,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.COLUMN]: {
    showArrows: true,
    arrowsSize: 23,
    hasThumbnails: false,
    galleryThumbnailsAlignment: 'none',
    imageMargin: 5,
    allowHover: true,
  },
  [GALLERY_LAYOUTS.FULLSIZE]: {
    showArrows: true,
    arrowsSize: 23,
    cubeType: 'fill',
    floatingImages: 0,
    slideshowInfoSize: 0,
    allowHover: true,
  },
};
