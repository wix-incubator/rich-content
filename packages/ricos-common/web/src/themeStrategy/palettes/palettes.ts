/* eslint-disable no-unused-vars */
const TemplateExample = [
  {
    name: 'color_1',
    reference: 'white/black',
  },
  {
    name: 'color_2',
    reference: 'black/white',
  },
  {
    name: 'color_3',
    reference: 'primery-1',
  },
  {
    name: 'color_4',
    reference: 'primery-2',
  },
  {
    name: 'color_5',
    reference: 'primery-3',
  },
  {
    name: 'color_11',
    reference: 'color-1',
  },
  {
    name: 'color_12',
    reference: 'color-2',
  },
  {
    name: 'color_13',
    reference: 'color-3',
  },
  {
    name: 'color_14',
    reference: 'color-4',
  },
  {
    name: 'color_15',
    reference: 'color-5',
  },
  {
    name: 'color_16',
    reference: 'color-6',
  },
  {
    name: 'color_17',
    reference: 'color-7',
  },
  {
    name: 'color_18',
    reference: 'color-8',
  },
  {
    name: 'color_19',
    reference: 'color-9',
  },
  {
    name: 'color_20',
    reference: 'color-10',
  },
  {
    name: 'color_21',
    reference: 'color-11',
  },
  {
    name: 'color_22',
    reference: 'color-12',
  },
  {
    name: 'color_23',
    reference: 'color-13',
  },
  {
    name: 'color_24',
    reference: 'color-14',
  },
  {
    name: 'color_25',
    reference: 'color-15',
  },
  {
    name: 'color_26',
    reference: 'color-16',
  },
  {
    name: 'color_27',
    reference: 'color-17',
  },
  {
    name: 'color_28',
    reference: 'color-18',
  },
  {
    name: 'color_29',
    reference: 'color-19',
  },
  {
    name: 'color_30',
    reference: 'color-20',
  },
  {
    name: 'color_31',
    reference: 'color-21',
  },
  {
    name: 'color_32',
    reference: 'color-22',
  },
  {
    name: 'color_33',
    reference: 'color-23',
  },
  {
    name: 'color_34',
    reference: 'color-24',
  },
  {
    name: 'color_35',
    reference: 'color-25',
  },
];

const themes: { [propName in PalettePreset]: string[] } = {
  darkTheme: [
    '#FFFFFF',
    '#000000',
    '#ED1C24',
    '#0088CB',
    '#FFCB05',
    '#000000',
    '#616161',
    '#8C8C8C',
    '#F3F3F3',
    '#FFFFFF',
    '#074B54',
    '#0E95A7',
    '#15E0FB',
    '#89EFFC',
    '#D9FBFF',
    '#071F4E',
    '#0E3E9B',
    '#155DE9',
    '#83A8F0',
    '#ADC6F8',
    '#221333',
    '#442565',
    '#663898',
    '#9C7FBA',
    '#C4AEDD',
    '#27331B',
    '#4E6636',
    '#749851',
    '#9BCB6C',
    '#CAE5AF',
  ],
};

function paletteToWixPalette(preset: [string, ...string[]]): Palette {
  return preset.map((color, i) => ({ ...TemplateExample[i], value: color } as Color)) as Palette;
}

const palettes: { [paletteName in string]: Palette } = Object.keys(themes).reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: paletteToWixPalette(themes[curr]),
  }),
  {}
);
export { palettes };
