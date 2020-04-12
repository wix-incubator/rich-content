import ThemeGenerator, { THEMES } from './ThemeGenerator';
import { wixPalettes } from '../../tests/palettesExample';
import { pluginHashtag } from '../../../../plugin-hashtag/web/src/editor';

describe('ThemeGenerator', () => {
  const createTheme = (isEditor, theme, palette, themeGenerators) =>
    new ThemeGenerator(isEditor, { theme, palette, themeGenerators });

  describe('constructor', () => {
    it('should create a new default theme', () => {
      const themeGenerator = createTheme(false, THEMES.DEFAULT);
      expect(themeGenerator._theme).toBe(THEMES.DEFAULT);
    });

    it('should create a new default theme if theme is unknwon', () => {
      const themeGenerator = createTheme('stam');
      expect(themeGenerator._theme).toBe(THEMES.DEFAULT);
    });

    it('should expect site colors if theme is site', () => {
      const func = () => createTheme(false, THEMES.PALETTE);
      expect(func).toThrow();
    });

    it('should expect site colors if theme is back office', () => {
      const func = () => createTheme(false, THEMES.BACK_OFFICE);
      expect(func).toThrow();
    });

    it('should create theme object', () => {
      const themeGenerator = createTheme(true, THEMES.PALETTE, wixPalettes.site1, [
        pluginHashtag().theme,
      ]);
      const styleObj = themeGenerator.getStylesObject();

      //expect(styleObj).toBe('#414141');
      expect(styleObj.editor.color).toBe('#414141');
      expect(styleObj.editor.background).toBe('#FFFFFF');
    });
    it('should not render editor styles if isEditor=false', () => {
      const themeGenerator = createTheme(false, THEMES.PALETTE, wixPalettes.site1, [
        pluginHashtag().theme,
      ]);
      const styleObj = themeGenerator.getStylesObject();
      expect(styleObj.editor).toBeUndefined();
    });
  });
});
