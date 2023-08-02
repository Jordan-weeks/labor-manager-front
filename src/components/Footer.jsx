import { Container, Flex, Link, Spacer } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Container>
      <Flex px={'20'} py={'10'}>
        <Link as={RouterLink}>Blog</Link>
        <Spacer />
        <Link as={RouterLink}>Contact</Link>
        <Spacer />
        <Link as={RouterLink}>About us</Link>
      </Flex>
    </Container>
  )
}
export default Footer
