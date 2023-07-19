import { useParams } from 'react-router-dom'
import useRole from '../../hooks/useRole'

import AdminJobSettings from './AdminJobSettings'
import UserJobSettings from './UserJobSettings'

const EditJob = () => {
  const { jobId } = useParams()
  const { isAdmin } = useRole(jobId)

  if (isAdmin) {
    return <AdminJobSettings />
  } else {
    return <UserJobSettings />
  }
}
export default EditJob
