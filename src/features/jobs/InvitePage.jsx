import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSendInviteMutation } from './jobsApiSlice'

const InvitePage = () => {
  const { jobId } = useParams()

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [sendInvite, { isLoading, isSuccess, isError, error }] =
    useSendInviteMutation()

  const onSendInviteClicked = async () => {
    sendInvite({ jobId, email, role })
  }

  return (
    <VStack my={10} align={'center'}>
      <Box minW={'75%'} gap={'6em'} justifyContent={'center'}>
        <Center>
          <Heading>Invite to job</Heading>
        </Center>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email address'
          size={'lg'}
          my={4}
          maxW={'20em'}
        />
        <Text mb='8px'>Select permission</Text>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          my={4}
          size={'lg'}
          maxW={'20em'}
        >
          <option value='user'>Read Only</option>
          <option value='editor'>Read and Edit</option>
          <option value='admin'>Admin</option>
        </Select>
        <Button onClick={onSendInviteClicked} variant={'outline'}>
          Send invite
        </Button>
      </Box>
    </VStack>
  )
}
export default InvitePage
