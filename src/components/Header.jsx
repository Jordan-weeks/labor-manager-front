import React from 'react'
import { Stack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
const Header = () => {
  return (
    <Stack direction='row'>
        <div>MY LOGO</div>
        <ButtonGroup>
            <Link as={RouterLink} to='login' >Login</Link>
        </ButtonGroup>

    </Stack>
  )
}

export default Header