import { TOOLBARS } from '../consts';

export const getDefaultToolbarSettings = ({ pluginButtons }) => {

  return [
    {
      name: TOOLBARS.PLUGIN,
      shouldCreate: () => {
        return {
          desktop: pluginButtons.filter(({ desktop }) => desktop !== false).length > 0,
          mobile: {
            ios: pluginButtons.filter(({ mobile }) => mobile).length > 0,
            android: pluginButtons.filter(({ mobile }) => mobile).length > 0,
          }
        };
      },
      getPositionOffset: () => ({
        desktop: { x: 0, y: 0 },
        mobile: {
          ios: { x: 0, y: 0 },
          android: { x: 0, y: 0 },
        }
      }),
      getButtons: () => {
        return {
          desktop: pluginButtons.filter(({ desktop }) => desktop !== false),
          mobile: {
            ios: pluginButtons.filter(({ mobile }) => mobile),
            android: pluginButtons.filter(({ mobile }) => mobile),
          }
        };
      },
      getVisibilityFn: () => ({
        desktop: () => true,
        mobile: {
          ios: () => true,
          android: () => true,
        }
      }),
    }
  ];
};
