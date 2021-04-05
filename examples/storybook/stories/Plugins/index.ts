import { storiesOf } from '@storybook/react';
import LinkPreviewStory from './LinkPreview';
import GalleryPluginStory from './Gallery';
import DividerPluginStory from './Divider';
import AccordionPluginStory from './Accordion';
import HeadingsPluginStory from './Headings';
import SpoilerPluginStory from './Spoiler';
import AnchorPluginStory from './Anchor';
import ButtonsPluginStory from './Buttons';
import Image from './Image';
import Video from './Video';
import VerticalEmbedStory from './VerticalEmbed';
import HtmlPluginStory from './HtmlPlugin';
import FileUploadStory from './FileUpload';
import MapPluginStory from './Map';
import TablePluginStory from './Table';

storiesOf('Plugins', module)
  .add('Divider', DividerPluginStory)
  .add('Accordion', AccordionPluginStory)
  .add('Spoiler', SpoilerPluginStory)
  .add('Headings', HeadingsPluginStory)
  .add('Anchor', AnchorPluginStory)
  .add('Image', Image)
  .add('Video', Video)
  .add('Gallery', GalleryPluginStory)
  .add('Link Preview', LinkPreviewStory)
  .add('Buttons', ButtonsPluginStory)
  .add('Vertical Embed', VerticalEmbedStory)
  .add('HTML Plugin', HtmlPluginStory)
  .add('File Upload', FileUploadStory)
  .add('Map', MapPluginStory)
  .add('Table', TablePluginStory);
