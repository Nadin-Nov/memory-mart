import '@fontsource/dm-sans/index.css';
import '@fontsource/vesper-libre/index.css';
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    breakpoints: {
      mobile: '380px',
      smallTablet: '476px',
      tablet: '768px',
      desktop: '992px',
      wide: '1440px',
    },
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
          500: { value: '#3A3832' },
          300: { value: '#383631' },
        },
        gray: {
          200: { value: '#D8D8D8' },
          500: { value: '#707070' },
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
        progressSteps: {
          fg: { value: '{colors.lightBeige.500}' },
          muted: { value: '{colors.teal.600}' },
          solid: { value: '{colors.teal.600}' },
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
            sm: { fontSize: '28px' },
            xs: { fontSize: '24px' },
          },
        },
      },
    },
  },
});

export const iconSizes = {
  headerIcon: 24,
};

export const hoverStyles = {
  linkHover: { _hover: { color: 'primary._hover' } },
  buttonHover: {
    _hover: {
      backgroundColor: 'transparent',
      color: 'primary._hover',
    },
    _active: {
      backgroundColor: 'transparent',
      color: 'primary._hover',
    },
  },
};

export const layoutStyles = {
  header: {
    bg: 'beige.500',
    p: '10px',
    zIndex: 10,
  },
  grid: {
    templateColumns: { base: '1fr 1fr', md: '1fr 3fr 1fr' },
    alignItems: 'center',
    w: '100%',
    maxW: '1440px',
    margin: '0 auto',
  },
  mobileMenu: {
    position: 'fixed',
    top: '70px',
    left: '0',
    width: '100vw',
    height: 'calc(100vh - 70px)',
    bg: 'beige.500',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    p: '20px',
    overflowY: 'auto',
  },
};

export const navMenuStyles = {
  container: {
    as: 'nav',
    justify: 'center',
    align: 'center',
    gap: '20px',
    maxW: '100%',
    flexWrap: 'wrap',
    direction: { base: 'column', md: 'row' },
  },
};

export const footerResponsiveStyles = {
  container: {
    direction: { base: 'column', tablet: 'row' },
    alignItems: { base: 'center' },
    gapY: { base: '15px', desktop: '0' },
  },
  link: {
    fontSize: { base: '11px', mobile: '13px', smallTablet: '14px', desktop: '16px' },
  },
  linkGap: {
    gapX: { base: '15px', desktop: '41px' },
  },
  inputContainer: {
    maxWidth: { base: 379, tablet: 280, desktop: 396 },
  },
};

export const cartResponsiveStyles = {
  wrapper: {
    paddingY: { base: 4, md: 8 },
    paddingX: { mobile: 2, smallTablet: 4, md: 8 },
  },
  cartContainer: {
    templateColumns: { base: '1fr', desktop: '2fr 1fr' },
  },
  itemContainer: {
    templateColumns: { base: '1fr', tablet: '100px 1fr auto' },
    justifyItems: { base: 'center' },
  },
};

export const system = createSystem(defaultConfig, customConfig);
export default system;
