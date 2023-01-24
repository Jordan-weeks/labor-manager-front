import React from "react";
import { Flex, Spacer, Stack } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
const Header = () => {
  return (
    <Flex m="3">
      <div>MY LOGO</div>
      <Spacer />
      <ButtonGroup>
        <Link as={RouterLink} to="login">
          Login
        </Link>

        <Link as={RouterLink} to="create">
          Register
        </Link>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
