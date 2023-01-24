// import { useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

import { useSelector } from "react-redux";
import SettingsForm from "./SettingsForm";
import { selectUserById } from "../users/userApiSlice.js";

const DashSettings = () => {
  // const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));
  console.log(id);
  const content = user ? <SettingsForm user={user} /> : <p>Loading...</p>;
  return content;
};
export default DashSettings;
