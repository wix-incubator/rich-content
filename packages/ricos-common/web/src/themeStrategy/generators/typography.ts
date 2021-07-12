import { CssVarsObject, RicosTheme, WixTypography, WixTypographyDefinition } from '../themeTypes';

const toEntries = (wixTypography: WixTypography): [string, WixTypographyDefinition][] =>
  Object.entries(wixTypography);

const definitionToCssFont = (def: WixTypographyDefinition): string =>
  def.value.substr(5, def.value.length - 6);

const toVars = (wixTypography: WixTypography) =>
  toEntries(wixTypography).reduce(
    (prev, curr) => ({
      ...prev,
      [`font-${curr[0].toLowerCase()}`]: definitionToCssFont(curr[1]),
    }),
    {}
  );

export default function createTypography(typography?: RicosTheme['typography']): CssVarsObject {
  if (!typography) {
    return {};
  }
  const { wixTypography } = typography;
  const wixTypographyVars: CssVarsObject = wixTypography ? toVars(wixTypography) : {};
  return wixTypographyVars;
}
