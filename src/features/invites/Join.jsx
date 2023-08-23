import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserId } from '../auth/authSlice'
import { useJoinJobMutation } from '../jobs/jobsApiSlice'
const Join = () => {
  const { inviteId } = useParams()
  const [joinJob, { isLoading, isSuccess, isError, error }] =
    useJoinJobMutation()
  const userId = useSelector(selectUserId)

  useEffect(() => {
    let ignore = false
    console.log('first')
    if (!ignore) {
      linkVisited()
    }

    return () => {
      ignore = true
      console.log('second')
    }
  }, [])

  const linkVisited = async () => {
    console.log('third')

    await joinJob({ inviteId, userId })
  }

  let content
  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div> uh oh... {error?.data?.message}</div>
  }
  if (isSuccess) content = <div>Job joined successfully! </div>
  return content
}
export default Join
