import {
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import CustomButton from '../../../components/CustomButton'
import useRole from '../../../hooks/useRole'
import { selectUserId } from '../../auth/authSlice'
import { useGetAssignedJobsQuery, useGetUsernamesQuery } from '../jobsApiSlice'
import CommentCard from './CommentCard'
import styles from './styles/task-detail.module.css'
import {
  useAddCommentMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from './tasksApiSlice'

const TaskDetail = ({ taskId, setSelectedTask, job }) => {
  const cx = classNames.bind(styles)
  const { jobId } = useParams()
  const ref = useRef(null)
  const navigate = useNavigate()
  const [taskAssignees, setTaskAssignees] = useState(null)
  const userId = useSelector(selectUserId)
  const [task, setTask] = useState(null)
  const { isAdmin, isEditor } = useRole(jobId)
  const [status, setStatus] = useState('')

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
  const {
    data: names,
    isSuccess: isQuerySuccess,
    isLoading: isNamesLoading,
  } = useGetUsernamesQuery(jobId)

  useEffect(() => {
    if (typeof job === 'object') {
      setTask(job.tasks.find((task) => task._id === taskId))
    }
  }, [taskId])
  useEffect(() => {
    setStatus(task?.status)
  }, [task])

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
    setStatus(e.value)
    updateTask({ jobId, taskId, status: e.value })
  }

  useEffect(() => {
    setTaskAssignees(
      task?.assignees?.map((assignee) => {
        const userName = names.find((user) => user.userId === assignee.userId)
        return { value: assignee.userId, label: userName.fullName }
      })
    )
  }, [task])

  const changeAssignees = async (e, taskId) => {
    setTaskAssignees(e)

    updateTask({
      jobId,
      taskId,
      assignees: e,
    })
  }

  const onDeleteClicked = async () => {
    await deleteTask({ jobId, taskId })
    setSelectedTask('')
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
          <CustomButton variant='accent' onClick={onAddCommentClicked}>
            Add Comment
          </CustomButton>
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

  const assigneeOptions = names?.map((user) => {
    return { value: user.userId, label: user.fullName }
  })

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Blocked', label: 'Blocked' },
    { value: 'Completed', label: 'Completed' },
  ]

  if (taskId === '') return null
  // if isLoading
  else
    return (
      <div className={cx('wrapper')}>
        <h2 className={cx('heading')}>{task?.taskName}</h2>

        <div className={cx('description-wrapper')}>
          <p className={cx('description')}>{task?.description}</p>
          {isAdmin || isEditor ? (
            <div className={cx('description-icons')}>
              <RiEdit2Line />
            </div>
          ) : null}
        </div>
        <p>{task?.estimatedHours} Hours estimated for this task</p>
        <div className={cx('select-container')}>
          <label htmlFor=''>Status</label>
          <Select
            value={{ label: status, value: task?.status }}
            onChange={(e) => changeTaskStatus(e, task._id)}
            options={statusOptions}
          />

          <label htmlFor=''>Assignees</label>
          <Select
            onChange={(e) => changeAssignees(e, task._id)}
            defaultValue={''}
            value={taskAssignees}
            options={assigneeOptions}
            isMulti
          />
        </div>

        {commentSection()}
        {addCommentSection()}
        {isAdmin || isEditor ? (
          <div>
            <CustomButton variant='secondary' onClick={onDeleteClicked}>
              Delete Task
            </CustomButton>
          </div>
        ) : null}
      </div>
    )
}

export default TaskDetail
