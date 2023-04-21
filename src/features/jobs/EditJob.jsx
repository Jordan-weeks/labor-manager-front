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
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { selectUserId } from '../auth/authSlice'
import {
  useDeleteJobMutation,
  useGetAssignedJobsQuery,
  useGetJobQuery,
  useGetUsernamesQuery,
  useUpdateJobMutation,
} from './jobsApiSlice'

const EditJob = () => {
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)

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
    console.log(job)
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

        <ButtonGroup>
          <Button onClick={onSaveClicked} width='full'>
            Save Changes
          </Button>
          <Button width='full'>
            <Link as={RouterLink} to={`/jobs/${jobId}/invite`}>
              Invite user
            </Link>
          </Button>
          <Button onClick={onDeleteClicked} width='full'>
            Delete Job
          </Button>
        </ButtonGroup>
      </Container>
    )
  }
}
export default EditJob
