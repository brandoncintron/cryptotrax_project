import { Flex, Text, Box, Container, HStack, Center } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import SearchBar from "@/components/SearchBar";
import CryptoTable from "@/components/tables/CryptoTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function Rankings({ rankingsData: propRankingsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 25;
  const [page, setPage] = useState(1);

  // If rankingsData is passed from HomePage then use it; otherwise, fetch as usual.
  const { data: fetchedData, loading, err } = 
    propRankingsData
      ? { data: propRankingsData, loading: false, err: null }
      : useFetch(`/api/rankings`, null, "rankingsData");

  // Use whichever data is available.
  const cryptoData = fetchedData || [];

  const startIndex = (page - 1) * pageSize;
  const pageData = cryptoData.slice(startIndex, startIndex + pageSize);

  return (
    <Container w={"90%"}>
      <Flex justify={"space-between"} align={"center"} flexDir={{ base: "column", sm: "row" }} my={12}>
        <Text textStyle="2xl" mb={{ base: 8, sm: 0 }}>
          Rankings
        </Text>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Flex>
      <Box>
        {loading ? (
          <LoadingSpinner h={"92vh"} />
        ) : err ? (
          <Text>{err}</Text>
        ) : (
          <CryptoTable cryptos={pageData} searchQuery={searchQuery} />
        )}
      </Box>
      <Center height={"60px"}>
        <PaginationRoot
          count={200}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Container>
  );
}

export default Rankings;
