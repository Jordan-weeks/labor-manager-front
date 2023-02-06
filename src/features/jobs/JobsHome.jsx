import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const JobsHome = () => {
  return (
    <>
      <div>JobsHome</div>;
      <Link as={RouterLink} to="new-job">
        Create new job
      </Link>
    </>
  );
};
export default JobsHome;
