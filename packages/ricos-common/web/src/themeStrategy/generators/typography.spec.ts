import { CssVarsObject, RicosTypography } from '../themeTypes';
import { wixTypographyTestCase, expectedOutput } from '../../../tests/wixTypographyExamples';
import createTypography from './typography';

describe('Typography', () => {
  const mocks: { input?: RicosTypography; output: CssVarsObject }[] = [
    { input: undefined, output: {} },
    { input: {}, output: {} },
    {
      input: { fontFamily: 'Arial' },
      output: { fontFamily: 'Arial' },
    },
    {
      input: { wixTypography: wixTypographyTestCase },
      output: expectedOutput,
    },
  ];

  it('should return empty object if typography is empty / undefined', () => {
    const cssVars1 = createTypography(mocks[0].input);
    const cssVars2 = createTypography(mocks[1].input);
    expect(cssVars1).toEqual({});
    expect(cssVars2).toEqual({});
  });

  it('should apply wixTypography', () => {
    const cssVars = createTypography(mocks[3].input);
    expect(cssVars).toStrictEqual(mocks[3].output);
  });
});
