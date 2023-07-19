import { useSelector } from 'react-redux'
import { selectUserId } from '../features/auth/authSlice'
import { useGetAssignedJobsQuery } from '../features/jobs/jobsApiSlice'

const useRole = (jobId) => {
  const userId = useSelector(selectUserId)
  const { job } = useGetAssignedJobsQuery(userId, {
    selectFromResult: ({ data }) => ({
      job: data?.find((job) => job.id === jobId),
    }),
  })

  const user = job?.usersOnJob.find((user) => user.userId === userId)
  const role = user?.role
  let isAdmin = false
  let isEditor = false

  if (role === 'admin') {
    isAdmin = true
  }
  if (role === 'editor') {
    isEditor = true
  }
  return { isAdmin, isEditor }
}
export default useRole
