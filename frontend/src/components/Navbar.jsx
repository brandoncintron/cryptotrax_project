import { Box, Button, Flex, Text, Heading, Container } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";

import Logo from "./icons/CryptotraxLogo";
import { Link } from "react-router-dom";

function Navbar() {
  const headerBorderColor = useColorModeValue("#e5e5e5", "#18181b");
  const headerBgColor = useColorModeValue("white", "#09090b");
  const logoFill = useColorModeValue("#09090b", "white");

  return (
    <Box
      borderBottom={"1px solid"}
      borderColor={headerBorderColor}
      bg={headerBgColor}
      h={"60px"}
      zIndex={"10"}
    >
      <Flex justify={"space-between"} align={"center"} h={"inherit"} mx={{base: 4, sm: 8}}>
        <Flex>
          <Link to={"/"}>
            <Flex w={"fit-content"} align={"center"} cursor={"button"}>
              <Logo fill={logoFill} height={"36px"} width={"36px"} />
              <Text
                fontFamily={"Poetsen One"}
                fontSize={"21px"}
                pl={2}
                display={{
                  base: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                  "2xl": "flex",
                }}
              >
                Cryptotrax
              </Text>
            </Flex>
          </Link>

          <Flex
            w={{
              base: "12em",
              sm: "15em",
              md: "15em",
              lg: "15em",
              xl: "15em",
            }}
            ml={{
              base: 6,
              sm: 12,
            }}
            justify={"space-between"}
            align={"center"}
            cursor={"button"}
          >
            <Link to={"/rankings"}>Rankings</Link>
            <Link to={"/favorites"}>Track</Link>
            <Link to={"/news"}>News</Link>
          </Flex>
        </Flex>

        <Flex align={"inherit"}>
          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
