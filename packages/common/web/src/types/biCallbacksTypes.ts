import { ToolbarType } from './toolbarEnums';
import { OnPluginAction } from './pluginsBiCallbacksTypes';
import { TABLE_TYPE } from 'ricos-content';
interface biCallbackParams {
  version?: string;
}

type EntryType = ToolbarType;
export interface onPluginAddStepArgs extends biCallbackParams {
  pluginId: string;
  pluginDetails: unknown;
  entryPoint: ToolbarType;
  entryType: EntryType;
  step: 'FileUploadDialog' | 'PluginModal';
}

export interface PluginAddSuccessParams {
  rows?: number;
  columns?: number;
}

export interface PublishParams {
  [TABLE_TYPE]?: {
    rows?: number;
    columns?: number;
  };
}

export interface BICallbacks {
  onPluginAdd?(pluginId: string, entryPoint: string, version: string): void;
  onPluginAddSuccess?(
    pluginId: string,
    entryPoint: string,
    params: PluginAddSuccessParams,
    version: string
  ): void;
  onPluginAddStep?(params: onPluginAddStepArgs): void;
  onPluginDelete?(pluginId: string, version: string): void;
  onPublish?(
    postId: string | undefined,
    pluginsCount: Record<string, number> | undefined,
    pluginsDetails:
      | {
          type: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any;
        }[]
      | undefined,
    params: PublishParams | undefined,
    version: string
  ): void;
  onViewerAction?(pluginId: string, actionName: ActionName, value: string): void;
  onViewerLoaded?(isPreview: boolean, version: string): void;
  onOpenEditorSuccess?(version: string): void;
  onPluginChange?(
    pluginId: string,
    changeObject: { from: string; to: string },
    version: string
  ): void;
  onMediaUploadStart?(
    correlationId: string,
    pluginId: string,
    fileSize: number | undefined,
    mediaType: string | undefined,
    version: string
  ): void;
  onMediaUploadEnd?(
    correlationId: string,
    pluginId: string,
    duration: number,
    fileSize: number | undefined,
    mediaType: string | undefined,
    isSuccess: boolean,
    errorType: string | undefined,
    version: string
  ): void;
  onPluginAction?: OnPluginAction;
}

type ActionName = 'expand_gallery' | 'expand_image' | 'Click';
