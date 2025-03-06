import { Flex, Text, Box, Container } from "@chakra-ui/react";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import SearchBar from "@/components/SearchBar";
import CryptoTable from "@/components/tables/CryptoTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StarIcon from "@/assets/star";

// 1 api call every 3 mins
function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: cryptoData,
    loading,
    err,
  } = useFetch("/api", null, "bestDailyPerformersData");

  return (
    <Container w={"90%"} mb={20}>
      <Flex
        justify={"space-between"}
        align={"center"}
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
        mb={12}
      >
        <Flex fontSize="2xl" mb={{ base: 6, sm: 6 }} align={"center"}>
          <Box w={"fit"} mr={3}>
            <StarIcon />
          </Box>

          <Box>
            <Text>Top 20 Best Performing Cryptocurrencies Today</Text>
            <Text fontSize={"sm"} pt={1} color={"GrayText"}>
              Explore cryptos with the highest percentage gains as of today.
            </Text>
          </Box>
        </Flex>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Flex>
      <Box>
        {loading ? (
          <LoadingSpinner h={"10vh"} />
        ) : err ? (
          <Text>{err}</Text>
        ) : (
          <CryptoTable cryptos={cryptoData} searchQuery={searchQuery} />
        )}
      </Box>
    </Container>
  );
}

export default Home;
