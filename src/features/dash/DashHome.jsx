import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../auth/authSlice";
const DashHome = () => {
  const { email } = useSelector(selectUserData);
  return (
    <>
      <div>DashHome</div>
      <div>Welcome {email} </div>
      <Link as={RouterLink} to="settings">
        User Settings
      </Link>
    </>
  );
};
export default DashHome;
