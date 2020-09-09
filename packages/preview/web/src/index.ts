import { interactionMap } from './Interactions/interactionMap';
import { defaultTransformation } from './Components/default-transformation';
export { default as ContentStateTransformation } from './RuleEngine/ContentStateTransformation';
export { default as RichContentPreview } from './Components/RichContentPreview';
export { interactionMap };

export interface PreviewConfig {
  transformation?: typeof defaultTransformation;
  contentInteractionMappers?: typeof interactionMap[];
  onPreviewExpand?: () => void;
}
const defaultConfig: PreviewConfig = {
  transformation: defaultTransformation,
  contentInteractionMappers: [interactionMap],
};

export const previewSettings = (config: PreviewConfig = {}) => ({
  ...defaultConfig,
  ...config,
});
