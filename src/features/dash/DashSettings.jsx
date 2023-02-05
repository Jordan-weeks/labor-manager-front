// import useAuth from "../../hooks/useAuth";
import { useGetUserDataQuery } from "../users/userApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../auth/authSlice";
import SettingsForm from "./SettingsForm";

const DashSettings = () => {
  const userId = useSelector(selectUserId);
  const { data: userData } = useGetUserDataQuery(userId);

  if (!userData) return <div>Loading...</div>;
  const content = <SettingsForm userData={userData} />;

  return content;
};
export default DashSettings;
