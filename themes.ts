import {createSoftenMask, createThemeBuilder} from '@tamagui/theme-builder';
const themesBuilder = createThemeBuilder()
  .addPalettes({
    dark: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],

    light: ['#fff', '#eee', '#ccc', '#999', '#222', '#111', '#000'],
  })

  .addTemplates({
    base: {
      background: 0,

      color: 12,
    },
  })

  .addMasks({
    soften: createSoftenMask(),
  })

  .addThemes({
    light: {
      template: 'base',

      palette: 'light',
    },

    dark: {
      template: 'base',

      palette: 'dark',
    },
  })

  .addChildThemes({
    subtle: {
      mask: 'soften',
    },
  });
export const themes = themesBuilder.build();
