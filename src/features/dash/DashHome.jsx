import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const DashHome = () => {
  return (
    <>
      <div>DashHome</div>
      <Link as={RouterLink} to="settings">
        User Settings
      </Link>
    </>
  );
};
export default DashHome;
