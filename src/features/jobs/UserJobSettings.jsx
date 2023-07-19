import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  EditableInput,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import useRole from '../../hooks/useRole'
import { selectUserId } from '../auth/authSlice'
import {
  useDeleteJobMutation,
  useGetAssignedJobsQuery,
  useGetJobQuery,
  useGetUsernamesQuery,
  useLeaveJobMutation,
} from './jobsApiSlice'

const UserJobSettings = () => {
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const [leaveJob, { isSuccess: isLeaveSuccess }] = useLeaveJobMutation()
  const {
    data: names,
    isSuccess: isQuerySuccess,
    error,
    isLoading: isNamesLoading,
  } = useGetUsernamesQuery(jobId)

  const {
    job,
    isLoading,
    isSuccess: isJobSuccess,
  } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data, isSuccess }) => ({
      job: data?.find((job) => job.id === jobId),
      isSuccess,
    }),
  })

  const navigate = useNavigate()

  const [jobName, setJobName] = useState('')
  const [jobNumber, setJobNumber] = useState('')
  const [crew, setCrew] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (isJobSuccess) {
      setJobName(job.jobName)
      setJobNumber(job.jobNumber)
      setCrew(job.usersOnJob)
      setActive(!job.active)
    }
    console.log(job)
  }, [isJobSuccess])

  const onLeaveClicked = async () => {
    onModalOpen()
    await leaveJob(jobId)
  }

  const userTableData = crew?.map((user) => {
    const userName = names?.find(({ userId }) => userId === user.userId)

    return (
      <Tr key={user?.userId}>
        <Td>
          <Text>{userName?.fullName}</Text>
        </Td>
      </Tr>
    )
  })

  if (isNamesLoading || isLoading) return <div>Loading...</div>
  else {
    return (
      <>
        <Container>
          <Container centerContent>
            <Heading>{jobName}</Heading>
            <Heading># {jobNumber}</Heading>
          </Container>
          <Heading size={'md'}>Crew:</Heading>
          <TableContainer variant={'simple'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>{userTableData}</Tbody>
            </Table>
          </TableContainer>

          <Button mt={'1em'} px={'2em'} onClick={onModalOpen}>
            Leave Job
          </Button>
        </Container>

        <Modal size={'lg'} isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to leave?</ModalHeader>
            <ModalCloseButton />
            <ModalBody size={''}>
              If you leave this job and would like to join again, you will need
              to be invited by an admin again.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='cyan' mr={3} onClick={onLeaveClicked}>
                Leave
              </Button>
              <Button onClick={onModalClose} variant='ghost'>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
export default UserJobSettings
