import { Flex, Text, Box, Button } from "@chakra-ui/react";
import "./css/HomePage.css";
import Logo from "@/components/icons/CryptotraxLogo";
import HomePageTable from "@/pages/HomePage";
import { useColorModeValue } from "@/components/ui/color-mode";
import { RiArrowRightLine } from "react-icons/ri";
import TopThreeBox from "./ui/TopThreeBox";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import LoadingSpinner from "./ui/LoadingSpinner";

function HomePage() {
  const logoFill = useColorModeValue("#09090b", "white");
  const bg = "linear-gradient(#002bff33 60%, rgba(255, 255, 255, 0) 100%)";

  // Call the rankings data, store in session
  const {
    data: rankingsData,
    loading,
    err,
  } = useFetch(`/api/rankings`, null, "rankingsData");
  if (loading) {
    return <LoadingSpinner h={"10vh"} />
  }
  if (err) {
    return <Text>{err}</Text>
  }

 const ids = [1027, 1, 52];
  const filteredCryptos = ids.map((id) =>
    rankingsData.find((crypto) => crypto.id === id)
  );

  return (
    <div>
      <Flex
        h={"500px"}
        bg={bg}
        position={"relative"}
        overflow={"clip"}
        align={"center"}
        justify={"space-between"}
        pl={14}
        pr={8}
      >
        <Flex align={"center"} p={6}>
          <Box>
            <Text fontSize={"26px"}>
              Find your next <br />
              Crypto Gem on Cryptotrax
            </Text>
            <Box mt={3}>
              <Link to={"/rankings"}>
                <Button rounded={12}>
                  Start Tracking Now <RiArrowRightLine />
                </Button>
              </Link>
            </Box>
          </Box>

          <Box
            pl={12}
            pb={8}
            display={{
              base: "none",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "flex",
              "2xl": "flex",
            }}
          >
            <Logo fill={logoFill} height={"200px"} width={"200px"} />
          </Box>
        </Flex>

        <Flex
          align={"center"}
          p={6}
          mb={6}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "flex",
            xl: "flex",
            "2xl": "flex",
          }}
        >
          {filteredCryptos.map((crypto, index) => (
            <TopThreeBox
              key={crypto.id}
              crypto={crypto}
              logo={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
              mb={index === 1 ? 9 : undefined}
              rank={index}
            />
          ))}
        </Flex>

        <Box className="banner-shape" bg={bg}></Box>
        <Box className="banner-shape-shadow" bg={bg}></Box>
      </Flex>

      <HomePageTable />
    </div>
  );
}

export default HomePage;
