import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton'
import { selectUserId } from '../auth/authSlice'
import { useGetAssignedJobsQuery } from './jobsApiSlice'
import styles from './styles/jobs-home.module.css'

const JobsHome = () => {
  const navigate = useNavigate()
  const userId = useSelector(selectUserId)
  const { data: jobData, isLoading } = useGetAssignedJobsQuery(userId)
  if (isLoading) return <div>Loading...</div>

  const tableData = jobData.map((job) => (
    <tr key={job.id}>
      <td>
        <p>{job.jobNumber}</p>
      </td>
      <td>{job.jobName}</td>
      <td>
        <CustomButton variant={'accent'} onClick={() => navigate(`${job.id}`)}>
          View
        </CustomButton>
      </td>
      <td>{job.active ? 'Active' : 'Completed'}</td>
    </tr>
  ))

  return (
    <main className={styles.wrapper}>
      <h1>Job List</h1>
      <table className={styles['job-table']}>
        <tr>
          <th>Job Number</th>
          <th>Job Name</th>
          <th>Details</th>
          <th>Status</th>
        </tr>
        {tableData}
      </table>
      <Link to={'new-job'}>
        <CustomButton variant={'accent'}>Create New Job</CustomButton>
      </Link>
    </main>

    // <Stack>
    //   <Stack justify={"space-between"} direction={"row"} mx={4}>
    //     <Text fontSize={30}>Active Jobs</Text>
    //     <Button onClick={() => navigate("new-job")} to="new-job">
    //       Create new job
    //     </Button>
    //   </Stack>

    //   <TableContainer>
    //     <Table variant={"simple"}>
    //       <Thead>
    //         <Tr>
    //           <Th>Job Number</Th>
    //           <Th>Job Name</Th>
    //           <Th>Details</Th>
    //           <Th>Status</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>{tableData}</Tbody>
    //     </Table>
    //   </TableContainer>
    // </Stack>
  )
}
export default JobsHome
