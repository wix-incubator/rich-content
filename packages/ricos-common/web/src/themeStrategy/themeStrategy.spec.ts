import themeStrategy from './themeStrategy';
import getType from 'jest-get-type';
import '../types';

// eslint-disable-next-line mocha/no-skipped-tests
describe('ThemeStrategy', () => {
  const driver = {
    runStrategy: (
      themeGenerators?: ThemeGeneratorFunction[],
      palette?: Palette,
      cssOverride?: RicosCssOverride
    ) => themeStrategy(false, themeGenerators, palette, cssOverride),
  };

  it('should create a theme object', () => {
    const themeStrategyResult = driver.runStrategy();
    expect(getType(themeStrategyResult)).toBe('object');
    expect(themeStrategyResult).toHaveProperty('theme');
  });

  const emptyResult = driver.runStrategy();
  it('should succeed without arguments', () => {
    expect(emptyResult).toBeTruthy();
    expect(emptyResult.theme).toBeTruthy();
  });

  it('should include modalTheme', () => {
    expect(emptyResult.theme.modalTheme).toBeTruthy();
    expect(getType(emptyResult.theme.modalTheme)).toBe('object');
  });

  it('should set inner props to override the default theme', () => {
    const cssOverride: RicosCssOverride = { modalTheme: { content: { backgroundColor: 'white' } } };
    const themeStrategyResult = driver.runStrategy(undefined, undefined, cssOverride);
    expect(themeStrategyResult.theme?.modalTheme?.content).toStrictEqual({
      backgroundColor: 'white',
    });
  });
});
