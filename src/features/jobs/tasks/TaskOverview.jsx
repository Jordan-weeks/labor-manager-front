import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import {
  RiCloseCircleLine,
  RiDeleteBin6Line,
  RiDeleteBinFill,
  RiEdit2Line,
  RiSave3Line,
  RiSettings5Line,
} from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../../components/CustomButton'
import useRole from '../../../hooks/useRole'
import CommentSection from './CommentSection'
import EditingTaskDetails from './EditingTaskDetails'
import TaskDetail from './TaskDetail'
import styles from './styles/task-overview.module.css'
import { useDeleteTaskMutation, useUpdateTaskMutation } from './tasksApiSlice'

const TaskOverview = ({ job, taskId, setSelectedTask }) => {
  const { jobId } = useParams()
  const { isAdmin, isEditor } = useRole(job?._id)
  const [task, setTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const cx = classNames.bind(styles)
  const navigate = useNavigate()

  const [
    deleteTask,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteTaskMutation()

  const [updateTask, { isSuccess: isUpdateSuccess, isError, error }] =
    useUpdateTaskMutation()

  const onDeleteClicked = async () => {
    await deleteTask({ jobId, taskId })
    setSelectedTask('')
  }

  useEffect(() => {
    setIsEditing(false)
  }, [taskId])

  useEffect(() => {
    if (isDelSuccess) {
      navigate(`/jobs/${jobId}`)
    }
  }, [isDelSuccess, navigate])

  useEffect(() => {
    if (typeof job === 'object') {
      setTask(job?.tasks?.find((task) => task?._id === taskId))
    }
  }, [taskId, job])

  const onSaveClick = async () => {
    updateTask({ jobId, taskId, updatedTask: task })
    setIsEditing(false)
  }
  const onCancelClick = () => {
    setIsEditing(false)
  }

  // const onSaveClick = () => {

  //   console.log('saved')
  //   setIsEditing(false)
  // }
  const onCloseClick = () => {
    setSelectedTask('')
    setIsEditing(false)
  }
  if (taskId !== '') {
    return (
      <div className={cx('wrapper')}>
        <div className={cx('icons')}>
          <div>
            <RiCloseCircleLine onClick={onCloseClick} />
          </div>

          {isAdmin || isEditor ? (
            <div className={cx('admin-icons')}>
              {isEditing ? (
                // <RiSave3Line onClick={onSaveClick} />
                <>
                  <CustomButton onClick={onSaveClick} variant={'secondary'}>
                    Save
                  </CustomButton>
                  <CustomButton onClick={onCancelClick} variant={'secondary'}>
                    Cancel
                  </CustomButton>
                </>
              ) : (
                <>
                  {/* Not sure if I like icon UI buttons or words... */}
                  {/* <RiSettings5Line onClick={() => setIsEditing(true)} />
                  <RiDeleteBin6Line onClick={onDeleteClicked} /> */}
                  <CustomButton
                    variant={'secondary'}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton variant={'secondary'} onClick={onDeleteClicked}>
                    Delete
                  </CustomButton>
                </>
              )}
            </div>
          ) : null}
        </div>
        {isEditing ? (
          <EditingTaskDetails
            onSaveClick={onSaveClick}
            task={task}
            taskId={taskId}
            setSelectedTask={setSelectedTask}
            setTask={setTask}
            job={job}
          />
        ) : (
          <TaskDetail
            taskId={taskId}
            task={task}
            setSelectedTask={setSelectedTask}
            job={job}
          />
        )}

        <CommentSection task={task} />
      </div>
    )
  } else null
}
export default TaskOverview
