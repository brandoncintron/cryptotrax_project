// FavoritesPage.jsx
import { Flex, Text, Box, Container, Table } from "@chakra-ui/react";
import { useState, useContext } from "react";
import SearchBar from "@/components/SearchBar";
import CryptoTable from "@/components/tables/CryptoTable";
import { FavoritesContext } from "@/contexts/FavoritesContext";

// 0 api calls - gets data from session storage
function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useContext(FavoritesContext);

  // Read cached data from both endpoints
  let dailyData = [];
  let rankingsData = [];

  const cachedDaily = sessionStorage.getItem("bestDailyPerformersData");
  const cachedRankings = sessionStorage.getItem("rankingsData");

  if (cachedDaily) {
    try {
      dailyData = JSON.parse(cachedDaily).data || [];
    } catch (error) {
      console.error("Error parsing bestDailyPerformersData:", error);
    }
  }

  if (cachedRankings) {
    try {
      rankingsData = JSON.parse(cachedRankings).data || [];
    } catch (error) {
      console.error("Error parsing rankingsData:", error);
    }
  }

  // Merge the two arrays
  const mergedData = [...dailyData, ...rankingsData];

  // Remove duplicates (by crypto.id)
  const uniqueData = mergedData.filter(
    (crypto, index, self) => index === self.findIndex((c) => c.id === crypto.id)
  );

  // Filter merged data to only include favorited cryptos
  const favoriteCryptos = uniqueData.filter((crypto) =>
    favorites.includes(crypto.id)
  );

  return (
    <Container w={"90%"}>
      <Flex justify={"space-between"} align={"center"} flexDir={{ base: "column", sm: "row", md: "row", lg: "row" }} my={12}>
        <Text textStyle="2xl" mb={{base: 8, sm: 0}}>
          Favorites
        </Text>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Flex>
      <Box>
        {favoriteCryptos.length > 0 ? (
          <CryptoTable cryptos={favoriteCryptos} searchQuery={searchQuery} />
        ) : (
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={9} textAlign="center" fontSize={"18px"}>
                  No favorites found. Start tracking cryptos to see them here.
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </Container>
  );
}

export default Favorites;
