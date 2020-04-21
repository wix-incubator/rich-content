import ThemeGenerator from './ThemeGenerator';
import jss from 'jss';
import preset from 'jss-preset-default';
import { defaultTheme } from './defaults';

export default function themeStrategy(
  isEditor: boolean,
  themeProperties: ThemeProperties
): { theme: Theme } {
  const { theme } = themeProperties;
  if (typeof theme === 'object') {
    return { theme: { ...defaultTheme, ...theme } };
  }
  jss.setup(preset());
  const themeGenerator = new ThemeGenerator(isEditor, themeProperties as StringThemeProperties);
  const styles = jss.createStyleSheet(themeGenerator.getStylesObject());
  const themeObj: object = styles.attach().classes;
  return { theme: { ...defaultTheme, ...themeObj } };
}
