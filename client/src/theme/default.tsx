import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FDE8F0",
      200: "#FACDDC",
      300: "#F7B2C8",
      400: "#F17DA1",
      500: "#9D2449",
      600: "#7D1C3B",
      700: '#6D1A35',
      800: '#5D182F',
      900: "#621132",
    },
    brand2: {
      50: "#E2F4F0",
      100: "#B6E2D9",
      200: "#86CFBE",
      300: "#56BB9F",
      400: "#37A18C",
      500: "#285C4D",
      600: "#1E4A3B",
      700: "#153829",
      800: "#0B2617",
      900: "#13322B",
    }
  },
  components: {

    Input: {

      variants: {
        outline: {
          // define the part you're going to style
          field: {

          }
        }
      }
    },
    Progress: {
      baseStyle: (props: any) => ({
        track: {
          borderRadius: 'full',
        },
        filledTrack: {
          bg: mode('blue.400', 'blue.100')(props),
        },
      })
    }
  }
})

export default theme
