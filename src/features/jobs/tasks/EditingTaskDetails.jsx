import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import CustomButton from '../../../components/CustomButton'
import useRole from '../../../hooks/useRole'
import { selectUserId } from '../../auth/authSlice'
import { useGetAssignedJobsQuery, useGetUsernamesQuery } from '../jobsApiSlice'
import CommentCard from './CommentCard'
import CommentSection from './CommentSection'
import styles from './styles/task-detail.module.css'
import {
  useAddCommentMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from './tasksApiSlice'

const EditingTaskDetails = ({
  taskId,
  setSelectedTask,
  setTask,
  task,
  onSaveClick,
  job,
}) => {
  const cx = classNames.bind(styles)
  const { jobId } = useParams()
  const ref = useRef(null)
  const navigate = useNavigate()
  const [taskAssignees, setTaskAssignees] = useState(null)
  const userId = useSelector(selectUserId)
  // const [task, setTask] = useState(null)
  const { isAdmin, isEditor } = useRole(jobId)

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [commentBody, setCommentBody] = useState('')

  const [updateTask, { isSuccess: isUpdateSuccess, isError, error }] =
    useUpdateTaskMutation()

  const {
    data: names,
    isSuccess: isQuerySuccess,
    isLoading: isNamesLoading,
  } = useGetUsernamesQuery(jobId)

  // useEffect(() => {
  //   if (typeof job === 'object') {
  //     setTask(job?.tasks?.find((task) => task?._id === taskId))
  //   }
  // }, [taskId, task, job])

  // useEffect(() => {
  //   setStatus(task?.status)
  // }, [task])

  const onCancelCommentClicked = () => {
    setCommentBoxOpen(false)
    setCommentBody('')
  }
  const changeTaskStatus = async (e, taskId) => {
    setTask({ ...task, status: e.value })
  }

  useEffect(() => {
    setTaskAssignees(
      task?.assignees?.map((assignee) => {
        const userName = names.find((user) => user.userId === assignee.userId)
        return {
          userId: assignee.userId,
          value: assignee.userId,
          label: userName?.fullName,
        }
      })
    )
  }, [task])

  const changeAssignees = async (e, taskId) => {
    console.log(e)
    // setTaskAssignees(e)
    setTask({ ...task, assignees: e })
  }

  const assigneeOptions = names?.map((user) => {
    return { userId: user.userId, value: user.userId, label: user.fullName }
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
        </div>
        <p>{task?.estimatedHours} Hours estimated for this task</p>
        <div className={cx('select-container')}>
          <label htmlFor=''>Status</label>
          <Select
            value={{ label: task?.status, value: task?.status }}
            onChange={(e) => changeTaskStatus(e, task._id)}
            options={statusOptions}
          />

          <label htmlFor=''>Assignees</label>
          <Select
            onChange={(e) => changeAssignees(e, task._id)}
            // defaultValue={''}
            value={taskAssignees}
            options={assigneeOptions}
            isMulti
          />
        </div>
      </div>
    )
}
export default EditingTaskDetails
