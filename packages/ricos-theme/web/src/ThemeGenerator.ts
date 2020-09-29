import { PaletteColors } from 'wix-rich-content-common';
import * as utils from './themeUtils';
import { palettes, assertPalette, COLORS } from './palettes';
import { PalettePreset, Palette, Color, ThemeGeneratorFunction } from 'ricos-common';

/* eslint-disable camelcase */

const PALETTE_PRESETS: { [propName in PalettePreset]: Palette } = { darkTheme: palettes.darkTheme };

const getColorByCode = (palette: Palette, code: number): Color => {
  const idx = code <= 5 ? code - 1 : code - 6;
  return palette[idx];
};

const getColorValue = (palette: Palette, code: number): string =>
  getColorByCode(palette, code).value;

const createCssVars = (colors: PaletteColors) => {
  const { adaptForeground, toRgbTuple } = utils;
  const { textColor, bgColor, actionColor } = colors;
  return `
  * {
    --ricos-text-color: ${textColor};
    --ricos-text-color-tuple: ${toRgbTuple(textColor)};
    --ricos-action-color: ${actionColor};
    --ricos-action-color-tuple: ${toRgbTuple(actionColor)};
    --ricos-action-color-fallback: ${adaptForeground(actionColor)};
    --ricos-action-color-fallback-tuple: ${toRgbTuple(adaptForeground(actionColor))};
    --ricos-background-color: ${bgColor};
    --ricos-background-color-tuple: ${toRgbTuple(bgColor)};
  }\n`;
};

export default class ThemeGenerator {
  isViewer: boolean;
  themeGeneratorFunctions: ThemeGeneratorFunction[];
  palette?: Palette;

  constructor(
    isViewer: boolean,
    palette?: Palette | PalettePreset,
    themeGeneratorFunctions: ThemeGeneratorFunction[] = []
  ) {
    this.setPalette(palette);
    this.themeGeneratorFunctions = themeGeneratorFunctions;
    this.isViewer = isViewer;
  }

  setPalette(palette?: string | Palette) {
    if (typeof palette === 'string') {
      if (palette in PALETTE_PRESETS) {
        this.palette = PALETTE_PRESETS[palette];
      } else {
        throw Error(
          `Palette ${palette} is unknown. Supported themes: ${PALETTE_PRESETS.toString()}`
        );
      }
    } else {
      assertPalette(palette);
      this.palette = palette;
    }
  }

  getStylesString() {
    if (!this.palette) {
      return '';
    }
    const colors: PaletteColors = {
      actionColor: getColorValue(this.palette, COLORS.ACTION_COLOR),
      bgColor: getColorValue(this.palette, COLORS.BG_COLOR),
      textColor: getColorValue(this.palette, COLORS.TEXT_COLOR),
    };
    this.themeGeneratorFunctions.forEach(themeGen => themeGen(colors, utils));
    return createCssVars(colors);
  }
}

export { PALETTE_PRESETS };
