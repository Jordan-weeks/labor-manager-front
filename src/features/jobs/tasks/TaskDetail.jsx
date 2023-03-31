import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectUserId } from '../../auth/authSlice'
import { useGetAssignedJobsQuery } from '../jobsApiSlice'
import CommentCard from './CommentCard'

import { useRef } from 'react'
import { useAddCommentMutation, useDeleteTaskMutation } from './tasksApiSlice'
import { selectCurrentTask } from './taskSlice'
const TaskDetail = () => {
  const ref = useRef(null)
  const navigate = useNavigate()
  const taskId = useSelector(selectCurrentTask)
  const userId = useSelector(selectUserId)

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [commentBody, setCommentBody] = useState('')

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

  const { jobId } = useParams()

  const { job, isLoading } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })

  const task = job?.tasks?.find((task) => task._id === taskId)

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

  const onDeleteClicked = async () => {
    deleteTask({ jobId, taskId })
  }

  const commentSection = () => {
    return task?.comments.map((comment) => (
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
  } else {
    return (
      <Stack mx={4}>
        <Heading>{task?.taskName}</Heading>

        <Text fontSize='xl'>{task?.description}</Text>
        {task?.estimatedHours ? (
          <Text fontSize='xl'>Estimated hours: {task?.estimatedHours}</Text>
        ) : null}
        <Text fontSize='xl'>Current Status: {task?.status}</Text>

        {commentSection()}

        {addCommentSection()}
        <ButtonGroup>
          <Button variant='outline' onClick={onDeleteClicked}>
            Delete Task
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
}

export default TaskDetail
