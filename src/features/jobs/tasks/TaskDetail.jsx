import {
  Button,
  ButtonGroup,
  Heading,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useRole from '../../../hooks/useRole'
import { selectUserId } from '../../auth/authSlice'
import { useGetAssignedJobsQuery } from '../jobsApiSlice'
import CommentCard from './CommentCard'
import {
  useAddCommentMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from './tasksApiSlice'

const TaskDetail = ({ taskId, setSelectedTask }) => {
  const { jobId } = useParams()
  const ref = useRef(null)
  const navigate = useNavigate()

  const userId = useSelector(selectUserId)
  const [task, setTask] = useState(null)
  const { isAdmin, isEditor } = useRole(jobId)

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [commentBody, setCommentBody] = useState('')

  const [updateTask, { isSuccess: isUpdateSuccess, isError, error }] =
    useUpdateTaskMutation()
  const [
    deleteTask,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteTaskMutation()
  const [
    addComment,
    {
      isSuccess: isCommentSuccess,
      isError: isCommentError,
      error: commentError,
    },
  ] = useAddCommentMutation()

  const { job, isLoading, isSuccess } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })

  useEffect(() => {
    if (typeof job === 'object') {
      setTask(job.tasks.find((task) => task._id === taskId))
      console.log('task set')
    }
  }, [job, task])

  useEffect(() => {
    if (isDelSuccess) {
      navigate(`/jobs/${jobId}`)
    }
  }, [isDelSuccess, navigate])
  const onAddCommentClicked = () => {
    setCommentBoxOpen(true)
  }
  const onSaveCommentClicked = async () => {
    await addComment({ jobId, taskId, commentBody, author: userId })
    onCancelCommentClicked()
  }
  const onCancelCommentClicked = () => {
    setCommentBoxOpen(false)
    setCommentBody('')
  }
  const changeTaskStatus = async (e, taskId) => {
    updateTask({ jobId, taskId, status: e.target.value })
  }

  const onDeleteClicked = async () => {
    deleteTask({ jobId, taskId })
  }

  const commentSection = () => {
    return task?.comments?.map((comment) => (
      <CommentCard key={comment._id} comment={comment} taskId={taskId} />
    ))
  }
  useEffect(() => {
    if (commentBoxOpen) {
      ref.current.focus()
    }
  }, [commentBoxOpen])

  const addCommentSection = () => {
    if (!commentBoxOpen) {
      return (
        <ButtonGroup>
          <Button variant='outline' onClick={onAddCommentClicked}>
            Add Comment
          </Button>
        </ButtonGroup>
      )
    } else if (commentBoxOpen) {
      return (
        <VStack align={'flex-start'}>
          <Textarea
            placeholder='Add a comment...'
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            ref={ref}
          />
          <ButtonGroup>
            <Button onClick={onSaveCommentClicked}>Save Comment</Button>
            <Button onClick={onCancelCommentClicked}>Cancel</Button>
          </ButtonGroup>
        </VStack>
      )
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!task) {
    return <div>Missing task!</div>
  }
  console.log(isAdmin)
  return (
    <Stack mx={4}>
      <Heading>{task?.taskName}</Heading>
      <Button onClick={() => setSelectedTask('')}>All tasks</Button>

      <Text fontSize='xl'>{task?.description}</Text>
      {task?.estimatedHours ? (
        <Text fontSize='xl'>Estimated hours: {task?.estimatedHours}</Text>
      ) : null}
      <Stack>
        <Text>Status:</Text>
        <Select
          defaultValue={task.status}
          onChange={(e) => changeTaskStatus(e, task._id)}
        >
          <option value='Pending'>Pending</option>,
          <option value='In Progress'>In Progress</option>,
          <option value='Blocked'>Blocked</option>,
          <option value='Completed'>Completed</option>
        </Select>
        <Text>Assigned to:</Text>
        <Select
          defaultValue={task.status}
          onChange={(e) => console.log('assigned to...')}
        >
          <option value='Pending'>Pending</option>,
          <option value='In Progress'>In Progress</option>,
          <option value='Blocked'>Blocked</option>,
          <option value='Completed'>Completed</option>
        </Select>
      </Stack>
      <Text fontSize='xl'>Current Status: {task?.status}</Text>

      {commentSection()}
      {addCommentSection()}
      {isAdmin || isEditor ? (
        <ButtonGroup>
          <Button variant='outline' onClick={onDeleteClicked}>
            Delete Task
          </Button>
        </ButtonGroup>
      ) : null}
    </Stack>
  )
}

export default TaskDetail
