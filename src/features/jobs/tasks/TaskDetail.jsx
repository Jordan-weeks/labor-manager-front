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
import {
  RiCloseCircleLine,
  RiDeleteBin6Line,
  RiDeleteBinFill,
  RiEdit2Line,
  RiSettings5Line,
} from 'react-icons/ri'
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

const TaskDetail = ({ taskId, task, setSelectedTask, job }) => {
  const { jobId } = useParams()

  const {
    data: names,
    isSuccess: isQuerySuccess,
    isLoading: isNamesLoading,
  } = useGetUsernamesQuery(jobId)

  return (
    <div>
      <h2>{task?.taskName}</h2>
      <div>
        <p> {task?.description}</p>
      </div>
      {task?.estimatedHours === null ? null : (
        <p>{task?.estimatedHours} Hours estimated for this task</p>
      )}
      <p>Status: {task?.status}</p>
      {task?.assignees.length === 0 ? (
        <p>Currently not assigned.</p>
      ) : (
        <ul>
          Assignees:{' '}
          {task?.assignees?.map((assignee) => {
            const userName = names?.find(
              (user) => user.userId === assignee.userId
            )
            return <li key={userName?.userId}>{userName?.fullName}</li>
          })}
        </ul>
      )}
    </div>
  )
}

export default TaskDetail
