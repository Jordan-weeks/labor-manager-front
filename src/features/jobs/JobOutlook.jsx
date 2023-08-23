import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import useRole from '../../hooks/useRole'
import { selectUserId } from '../auth/authSlice'
import { useGetAssignedJobsQuery } from './jobsApiSlice'
import styles from './styles/job-outlook.module.css'
import NewTask from './tasks/NewTask'
import TaskDetail from './tasks/TaskDetail'
import { setTaskId } from './tasks/taskSlice'
import { useUpdateTaskMutation } from './tasks/tasksApiSlice'
const JobOutlook = () => {
  const cx = classNames.bind(styles)
  const { jobId } = useParams()
  const userId = useSelector(selectUserId)
  const [selectedTask, setSelectedTask] = useState('')
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const { isAdmin, isEditor } = useRole(jobId)

  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })
  console.log(job)
  const viewTask = (taskId) => {
    setSelectedTask(taskId)
  }

  let tableData

  if (job?.tasks.length === 0) {
    tableData = (
      <tr>
        <td>No active tasks</td>
      </tr>
    )
  } else {
    tableData = job?.tasks.map((task) => {
      return (
        <tr key={task._id}>
          <td>
            <p>{task.taskName}</p>
          </td>
          <td>{task.assignedTo}</td>

          <td>{task.status}</td>
          <td>
            <CustomButton variant={'accent'} onClick={() => viewTask(task._id)}>
              View
            </CustomButton>
          </td>
        </tr>
      )
    })
  }
  // if (selectedTask !== '')
  //   return (
  //     <TaskDetail taskId={selectedTask} setSelectedTask={setSelectedTask} />
  //   )
  return (
    <div className={cx('wrapper')}>
      <h1>{job?.jobName}</h1>
      <table className={cx('task-table')}>
        <tbody>
          <tr>
            <th>Task</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
          {tableData}
        </tbody>
      </table>

      <div className={cx('button-group')}>
        {isAdmin || isEditor ? (
          <CustomButton onClick={() => setAddTaskOpen(true)} variant={'accent'}>
            Add Task
          </CustomButton>
        ) : null}

        {isAdmin ? (
          <Link to='invite'>
            <CustomButton variant={'secondary'}>Invite user</CustomButton>
          </Link>
        ) : null}
        {isAdmin ? (
          <Link to='edit-job'>
            <CustomButton variant={'secondary'}>Job Settings</CustomButton>
          </Link>
        ) : null}
      </div>
      <NewTask isOpen={addTaskOpen} onClose={() => setAddTaskOpen(false)} />
      <TaskDetail
        job={job}
        taskId={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  )
}
export default JobOutlook
