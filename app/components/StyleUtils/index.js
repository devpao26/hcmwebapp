/*
 * Style Utilities
 *
 * Include in this page a specific small styling to be use on different
 * part of the site
 *
 * media query usage:
 * ${ media.tablet/handheld`
 *   css styles...
 * `}
 */
import { css } from 'styled-components';

// Media Query
export const media = {
  handheld: (...args) => css`
    @media (max-width: 639px) {
      ${css(...args)}
    }
  `,
  handheldLandscape: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 1023px) {
      ${css(...args)}
    }
  `,
};
