import { useEffect } from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery } from "../users/userApiSlice";
import { setUserData, selectUserData, selectUserId } from "../auth/authSlice";

const DashHome = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const { data: userData, isLoading } = useGetUserDataQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div>DashHome</div>

      <div>Welcome {userData?.firstName} </div>
      <Link as={RouterLink} to="settings">
        User Settings
      </Link>
      <Link as={RouterLink} to="settings">
        Create new job
      </Link>
    </>
  );
};
export default DashHome;
