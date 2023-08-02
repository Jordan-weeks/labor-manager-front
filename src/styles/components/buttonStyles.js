import { defineStyleConfig } from '@chakra-ui/react'

export const ButtonStyles = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    accent: {
      size: { base: 'md', sm: 'lg' },
      bg: 'orange.400',
      color: 'white',
      _hover: {
        bg: 'orange.300',
      },
    },
    primary: {
      bg: 'blue.400',
      color: 'white',
      _hover: {
        bg: 'blue.300',
      },
    },
  },
  defaultProps: {},
})
