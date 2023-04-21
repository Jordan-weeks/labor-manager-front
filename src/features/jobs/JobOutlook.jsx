import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { selectUserId } from '../auth/authSlice'
import { useGetAssignedJobsQuery } from './jobsApiSlice'
import { useUpdateTaskMutation } from './tasks/tasksApiSlice'
import { setTaskId } from './tasks/taskSlice'

const JobOutlook = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)

  const [updateTask, { isSuccess: isUpdateSuccess, isError, error }] =
    useUpdateTaskMutation()

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })

  const changeTaskStatus = async (e, taskId) => {
    updateTask({ jobId, taskId, status: e.target.value })
  }

  const viewTask = (taskId) => {
    dispatch(setTaskId(taskId))
    navigate('details')
  }

  let tableData

  if (job?.tasks.length === 0) {
    tableData = (
      <Tr>
        <Td>No active tasks</Td>
      </Tr>
    )
  } else {
    tableData = job?.tasks.map((task) => {
      return (
        <Tr key={task._id}>
          <Td>
            <Text>{task.taskName}</Text>
          </Td>
          <Td>{task.assignedTo}</Td>

          <Td>
            <Select
              defaultValue={task.status}
              onChange={(e) => changeTaskStatus(e, task._id)}
            >
              <option value='Pending'>Pending</option>,
              <option value='In Progress'>In Progress</option>,
              <option value='Blocked'>Blocked</option>,
              <option value='Completed'>Completed</option>
            </Select>
          </Td>
          <Td>
            <Button onClick={() => viewTask(task._id)}>View</Button>
          </Td>
        </Tr>
      )
    })
  }

  return (
    <VStack spacing={6}>
      <Box>
        <HStack>
          <Heading>{job?.jobName}</Heading>
          <Icon
            onClick={() => navigate('edit-job')}
            as={IoSettingsOutline}
            boxSize={10}
          />
        </HStack>
        <TableContainer>
          <Table variant={'simple'}>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Assigned to</Th>
                <Th>Status</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>{tableData}</Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Button>
        <Link as={RouterLink} to='new-task'>
          Add Task
        </Link>
      </Button>
      <Button>
        <Link as={RouterLink} to='invite'>
          Invite user
        </Link>
      </Button>
    </VStack>
  )
}
export default JobOutlook
