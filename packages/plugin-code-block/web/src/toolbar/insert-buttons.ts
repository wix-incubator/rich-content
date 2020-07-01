import { TOOLBARS } from 'wix-rich-content-editor-common';
import { CodeBlockIcon } from '../icons';
import { CreateInsertButtons } from 'wix-rich-content-common';

const createInsertButtons: CreateInsertButtons<'helpers' | 't' | 'addBlockHandler' | 'icon'> = ({
  helpers,
  t,
  addBlockHandler,
  icon,
}) => {
  return [
    {
      name: 'CodeblockPlugin_InsertButton',
      type: 'custom-block',
      addBlockHandler,
      tooltipText: t('TextCodeBlock_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon || CodeBlockIcon,
      helpers,
      t,
    },
  ];
};

export default createInsertButtons;
