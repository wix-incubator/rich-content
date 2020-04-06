const imageType = 'wix-draft-plugin-image';
const imageTypeLegacy = 'IMAGE';
const galleryType = 'wix-draft-plugin-gallery';

function imageEntryToGallery(data, index) {
  const src = data.src;
  const url = src.file_name;
  return {
    metadata: {
      height: src.height,
      width: src.width,
      title: data?.metadata?.caption || '',
    },
    itemId: src.id || url + index,
    url,
  };
}

function convertEntryToGalleryItems(entry, index) {
  switch (entry.type) {
    case imageType:
    case imageTypeLegacy:
      return entry.data.src ? [imageEntryToGallery(entry.data, index)] : [];
    case galleryType:
      return entry.data.items;
    default:
      return [];
  }
}

export default function getImagesData({ entityMap }) {
  let sum = 0;
  const imageMap = {};
  const images = Object.values(entityMap)
    .map(convertEntryToGalleryItems)
    .reduce((urls, entryUrls, i) => {
      if (entryUrls.length > 0) {
        imageMap[i] = sum;
      }
      sum += entryUrls.length;
      return urls.concat(entryUrls);
    }, []);
  return { images, imageMap };
}
