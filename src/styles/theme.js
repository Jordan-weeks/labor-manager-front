import { extendTheme } from '@chakra-ui/react'
import { ButtonStyles } from './components/buttonStyles'

// const theme = extendTheme({
//   components: {
//     Button,
//   },
// })

const config = {
  components: {
    Button: ButtonStyles,
  },
  colors: {
    brand: { 100: '#238636' },
    orange: { 100: 'orange.100' },
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
}
export const theme = extendTheme(config)
