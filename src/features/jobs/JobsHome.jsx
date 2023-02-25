import {
  Button,
  Stack,
  VStack,
  Link,
  Text,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";
import { useGetAssignedJobsQuery } from "./jobsApiSlice";

const JobsHome = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const { data: jobData, isLoading } = useGetAssignedJobsQuery(userId);
  if (isLoading) return <div>Loading...</div>;

  const tableData = jobData.map((job) => (
    <Tr key={job.id}>
      <Td>
        <Text>{job.jobNumber}</Text>
      </Td>
      <Td>{job.jobName}</Td>
      <Td>
        <Button onClick={() => navigate(`${job.id}`)}>View</Button>
      </Td>
      <Td>{job.active ? "Active" : "Completed"}</Td>
    </Tr>
  ));

  return (
    <Stack>
      <Stack justify={"space-between"} direction={"row"} mx={4}>
        <Text fontSize={30}>Active Jobs</Text>
        <Button onClick={() => navigate("new-job")} to="new-job">
          Create new job
        </Button>
      </Stack>

      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th>Job Number</Th>
              <Th>Job Name</Th>
              <Th>Details</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>{tableData}</Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
export default JobsHome;
