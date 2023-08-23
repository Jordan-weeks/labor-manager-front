import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from '@chakra-ui/react'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../components/CustomButton'
import Alert from '../../../components/elements/Alert'
import { selectUserId } from '../../auth/authSlice'
import { useGetAssignedJobsQuery } from '../jobsApiSlice'
import { useAddTaskMutation } from '../tasks/tasksApiSlice'
import styles from './styles/new-task.module.css'

const NewTask = ({ isOpen, onClose }) => {
  const cx = classNames.bind(styles)
  const navigate = useNavigate()
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)
  const [newTaskOpen, setNewTaskOpen] = useState(isOpen)

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })

  const [addTask, { isSuccess, isError, error }] = useAddTaskMutation()

  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState('')

  const onTaskNameChange = (e) => setTaskName(e.target.value)
  const onDescriptionChange = (e) => setDescription(e.target.value)
  const onHoursChange = (e) => setHours(e.target.value)

  const onCreateTaskClicked = async () => {
    await addTask({
      jobId,
      taskName,
      description,
      estimatedHours: hours,
      status: 'pending',
    })
    console.log('Task Created')
  }
  useEffect(() => {
    if (isSuccess) {
      onClose()
      setTaskName('')
      setDescription('')
      setHours('')
    }
  }, [isSuccess])

  if (isOpen) {
    return (
      <div className={cx('wrapper')}>
        <h2>Create Task</h2>
        {isError ? (
          <Alert alertOpen={true} variant={'error'}>
            {error?.data?.message}
          </Alert>
        ) : null}
        <form className={cx('task-form')}>
          <label htmlFor='Task name'>Task Name</label>
          <input value={taskName} onChange={onTaskNameChange} type='text' />
          <label htmlFor='Description'>Description</label>
          <input
            value={description}
            onChange={onDescriptionChange}
            type='text'
          />
          <label htmlFor='hours'>Total Estimated hours</label>
          <input value={hours} onChange={onHoursChange} type='number' />

          <CustomButton onClick={onCreateTaskClicked} variant={'accent'}>
            Add Task
          </CustomButton>
          <CustomButton variant={'secondary'} onClick={onClose}>
            Cancel
          </CustomButton>
        </form>
      </div>
    )
  } else null
}
export default NewTask
