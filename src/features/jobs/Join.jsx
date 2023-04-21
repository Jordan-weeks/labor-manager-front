import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserId } from '../auth/authSlice'
import { useJoinJobMutation } from './jobsApiSlice'
const Join = () => {
  const { inviteId } = useParams()
  const [joinJob, { isLoading, isSuccess, isError, error }] =
    useJoinJobMutation()
  const userId = useSelector(selectUserId)
  console.log(userId)

  useEffect(() => {
    let ignore = false
    const linkVisited = async () => {
      await joinJob({ inviteId, userId })
    }
    if (!ignore) {
      linkVisited()
    }

    return () => {
      ignore = true
    }
  }, [])

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
