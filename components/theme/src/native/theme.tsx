/* tslint:disable:import-filter */
import { injectGlobal as baseInjectGlobal, ThemedStyledComponentsModule } from 'styled-components';

/* tslint:enable:import-filter */
import { themeCommon, ThemeInterfaceCommon } from '../themeCommon';
import { fontSizes, fontStyles, weights } from './fonts';

const themeObject = {
  ...themeCommon,
  fontSizes,
  fontStyles,
  weights,
  iconFont: 'Material-Design-Iconic-Font',
  space: [0, 4, 8, 16, 24, 32, 64, 128],
  buttonSpace: [0, 4, 6, 8, 10, 12, 14, 16],
  heights: {
    xsmall: 24,
    small: 32,
    medium: 40,
    large: 48,
    xlarge: 64,
    xxlarge: 80,
    xxxlarge: 152,
  },
};

interface ThemeInterface extends ThemeInterfaceCommon {
  fontSizes: typeof themeObject.fontSizes;
  fontStyles: typeof themeObject.fontStyles;
  weights: typeof themeObject.weights;
  heights: typeof themeObject.heights;
  depths: typeof themeObject.depths;
  iconFont: string;
}

const theme: ThemeInterface = themeObject;

const { injectGlobal } = {
  injectGlobal: baseInjectGlobal,
} as ThemedStyledComponentsModule<ThemeInterface>;

export { injectGlobal, ThemeInterface, theme };
