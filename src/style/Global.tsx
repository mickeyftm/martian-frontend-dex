import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  .heroHeaderForHeading{
      padding: 1rem 0;
      margin-bottom: 10px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;

  }

   .heroHeaderForHeading:after{
     content: "";
     width: 100%;
     height: 100%;
     bottom: 0;
     background-image: url(/images/FN-animation.svg);
     position: absolute;
     z-index: -1;
     background-repeat: no-repeat;
     background-size: cover;
     
  }
`

export default GlobalStyle
