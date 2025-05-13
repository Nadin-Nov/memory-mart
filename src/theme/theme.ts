import '@fontsource/dm-sans/index.css';
import '@fontsource/vesper-libre/index.css';
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Vesper Libre', serif` },
        body: { value: `'DM Sans', sans-serif` },
      },
      colors: {
        teal: {
          200: { value: '#9ababf' },
          500: { value: '#4dbaca' },
          600: { value: '#3196a5' },
        },
        beige: {
          500: { value: '#eeede1' },
        },
        lightBeige: {
          500: { value: '#fefbf4' },
        },
        warmBlack: {
          500: { value: '#ff2d46' },
          300: { value: '#383631' },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: '{colors.teal.600}' },
          contrast: { value: '{colors.lightBeige.500}' },
          _hover: { value: '{colors.teal.500}' },
          muted: { value: '{colors.teal.200}' },
        },
        darkText: {
          default: { value: '{colors.warmBlack.500}' },
          subtle: { value: '{colors.warmBlack.300}' },
        },
        lightText: {
          default: { value: '{colors.lightBeige.500}' },
        },
        link: {
          default: { value: '{colors.warmBlack.500}' },
          hover: { value: '{colors.teal.600}' },
        },
      },
    },
    recipes: {
      heading: {
        base: {
          fontFamily: 'heading',
          fontWeight: '400',
        },
        variants: {
          size: {
            bg: { fontSize: '36px' },
            md: { fontSize: '32px' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
export default system;
