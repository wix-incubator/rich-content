import get from 'lodash/get';
import { translate } from 'react-i18next';
import { BUTTONS } from 'wix-rich-content-common';
import EditIcon from '../icons/edit.svg';
import {
  MAX_ALIGNMENT_WIDTH,
  MIN_WIDTH,
  MAX_WIDTH,
  MIN_HEIGHT,
  MAX_HEIGHT,
} from '../constants';
import EditPanel from './HtmlEditPanel';

const getAlignmentButtonProps = componentData => ({ disabled: get(componentData, 'config.width', 0) > MAX_ALIGNMENT_WIDTH });

export default () => {
  return [
    {
      type: BUTTONS.INLINE_PANEL,
      keyName: 'edit',
      panelContent: translate(null)(EditPanel),
      icon: EditIcon,
      tooltipTextKey: 'EditButton_Tooltip',
    },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.WIDTH, min: MIN_WIDTH, max: MAX_WIDTH },
    { type: BUTTONS.HEIGHT, min: MIN_HEIGHT, max: MAX_HEIGHT },
    { type: BUTTONS.SEPARATOR },
    {
      type: BUTTONS.ALIGNMENT_LEFT,
      mapComponentDataToButtonProps: getAlignmentButtonProps,
    },
    { type: BUTTONS.ALIGNMENT_CENTER },
    {
      type: BUTTONS.ALIGNMENT_RIGHT,
      mapComponentDataToProps: getAlignmentButtonProps,
    },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.DELETE, keyName: 'delete', mobile: true },
  ];
};
