import { useEffect } from "react";
import { Box, Flex, Spacer, Stack } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { logout } from "../auth/authSlice";

const Header = () => {
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logout);
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const logoutClicked = () => {
    sendLogout();
  };
  return (
    <Box>
      <Flex m="3">
        <div>MY LOGO</div>
        <Spacer />
        <ButtonGroup>
          <Link as={RouterLink} to="/dash">
            Home
          </Link>

          <Link onClick={() => logoutClicked()}>Logout</Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Header;
