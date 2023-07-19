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
  useUpdateJobMutation,
} from './jobsApiSlice'

const AdminJobSettings = () => {
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)
  const {
    isOpen: isLeaveModalOpen,
    onOpen: onLeaveModalOpen,
    onClose: onLeaveModalClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure()
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
  const [
    deleteJob,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteJobMutation()
  const [leaveJob, { isSuccess: isLeaveSuccess }] = useLeaveJobMutation()

  const [
    updateJob,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateJobMutation()

  const navigate = useNavigate()

  const [jobName, setJobName] = useState('')
  const [jobNumber, setJobNumber] = useState('')
  const [crew, setCrew] = useState([])
  const [active, setActive] = useState(false)

  const onJobNameChange = (e) => setJobName(e.target.value)
  const onJobNumberChange = (e) => setJobNumber(e.target.value)
  const onAddCrewChange = (e) => setAddCrewInput(e.target.value)
  const onActiveChange = (e) => {
    setActive(e.target.checked)
  }

  const onDeleteClicked = async () => {
    await deleteJob(jobId)
  }
  const onLeaveClicked = async () => {
    await leaveJob(jobId)
    if (isUpdateSuccess) {
      navigate(-1)
    }
  }
  const onSaveClicked = async () => {
    await updateJob({
      jobId,
      jobName,
      jobNumber,
      usersOnJob: crew,
      active: !active,
    })
  }
  useEffect(() => {
    if (isJobSuccess) {
      setJobName(job.jobName)
      setJobNumber(job.jobNumber)
      setCrew(job.usersOnJob)
      setActive(!job.active)
    }
  }, [isJobSuccess])

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate('/jobs')
    }
  }, [isDeleteSuccess, navigate])
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate(-1)
    }
  }, [isUpdateSuccess, navigate])

  const changeUserRole = (role, userId) => {
    setCrew(
      crew.map((user) => {
        if (user.userId === userId) {
          return { ...user, role }
        } else {
          return user
        }
      })
    )
  }
  const removeUser = (userId) => {
    setCrew(crew.filter((user) => user.userId !== userId))
  }

  const userTableData = crew?.map((user) => {
    const userName = names?.find(({ userId }) => userId === user.userId)

    return (
      <Tr key={user?.userId}>
        <Td>
          <Text>{userName?.fullName}</Text>
        </Td>

        <Td>
          <Select
            defaultValue={user.role}
            onChange={(e) => changeUserRole(e.target.value, user.userId)}
          >
            <option value='user'>Read only</option>,
            <option value='editor'>Read and edit</option>,
            <option value='admin'>Admin</option>,
          </Select>
        </Td>
        <Td>
          <Button onClick={() => removeUser(user.userId)}>Remove</Button>
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
            <Heading as='h3' size='lg'>
              Edit Job
            </Heading>
          </Container>
          <FormControl isRequired>
            <FormLabel fontSize='2xl'>Job Name</FormLabel>
            <Input
              type='text'
              isRequired
              value={jobName}
              onChange={onJobNameChange}
              size='lg'
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='2xl'>Job Number</FormLabel>
            <Input
              type='text'
              isRequired
              value={jobNumber}
              onChange={onJobNumberChange}
              size='lg'
            />
          </FormControl>
          <Checkbox isChecked={active} onChange={onActiveChange}>
            Job Complete
          </Checkbox>

          <Text fontSize='2xl'>Crew:</Text>

          <TableContainer variant={'simple'}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>{userTableData}</Tbody>
            </Table>
          </TableContainer>

          <ButtonGroup mt={'1em'}>
            <Button onClick={onSaveClicked} width='full'>
              Save Changes
            </Button>
            <Button width='full'>
              <Link as={RouterLink} to={`/jobs/${jobId}/invite`}>
                Invite user
              </Link>
            </Button>
            <Button onClick={onDeleteModalOpen} width='full'>
              Delete Job
            </Button>
            <Button onClick={onLeaveModalOpen} width='full'>
              Leave Job
            </Button>
          </ButtonGroup>
        </Container>

        <Modal
          size={'lg'}
          isOpen={isLeaveModalOpen}
          onClose={onLeaveModalClose}
        >
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
              <Button onClick={onLeaveModalClose} variant='ghost'>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          size={'lg'}
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to delete this job?</ModalHeader>
            <ModalCloseButton />
            <ModalBody size={''}>
              If you delete this job, all users and tasks will be PERMANENTLY
              removed.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='cyan' mr={3} onClick={onDeleteClicked}>
                Delete
              </Button>
              <Button onClick={onDeleteModalClose} variant='ghost'>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
}
export default AdminJobSettings
