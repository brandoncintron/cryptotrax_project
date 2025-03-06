import { Flex, Table, Text, Stat } from "@chakra-ui/react";
import * as helpers from "@/utils/helpers";
import * as formatHelper from "@/utils/ScientificFormat";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { FavoritesContext } from "@/contexts/FavoritesContext";
import { toaster } from "@/components/ui/toaster"


// Pass in data from endpoints into cryptos
const CryptoTable = ({ cryptos, searchQuery }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoritesContext);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Table.ScrollArea>
    <Table.Root size="sm" showColumnBorder interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader></Table.ColumnHeader>
          <Table.ColumnHeader>Rank</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
          <Table.ColumnHeader>Today's Change</Table.ColumnHeader>
          <Table.ColumnHeader>Market Cap</Table.ColumnHeader>
          <Table.ColumnHeader>Circulating Supply</Table.ColumnHeader>
          <Table.ColumnHeader>Max Supply</Table.ColumnHeader>
          <Table.ColumnHeader>Volume (24h)</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredCryptos.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={9} textAlign="center">
              No results found.
            </Table.Cell>
          </Table.Row>
        ) : (
          // Filter out cryptos where current price > $500,000 and 24hr %change > 99,999%
          filteredCryptos
            .filter(
              (crypto) =>
                !(
                  crypto.quote?.USD?.price > 500000 ||
                  crypto.quote?.USD?.percent_change_24h > 99999
                )
            )
            .map((crypto) => (
              <Table.Row
                key={crypto.id}
                onClick={() => navigate(`/currency/${crypto.id}`)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell
                  onClick={(e) => {
                    e.stopPropagation();
                    if (favorites.includes(crypto.id)) {
                      removeFavorite(crypto.id);
                      toaster.create({
                        description: `Removed ${crypto.name} from favorites`,
                        type: "error",
                        max: 3,
                      })
                    } else {
                      addFavorite(crypto);
                      toaster.create({
                        description: `Successfully added ${crypto.name} to favorites`,
                        type: "success",
                        max: 3,
                      })
                    }
                    
                  }}
                >
                  <MdFavorite
                    color={favorites.includes(crypto.id) ? "#ea3943" : "gray"}
                  />
                </Table.Cell>

                <Table.Cell>{crypto.cmc_rank}</Table.Cell>
                <Table.Cell>{crypto.name}</Table.Cell>
                <Table.Cell>
                  {crypto.quote?.USD?.price
                    ? formatHelper.formatPriceSubscript(crypto.quote.USD.price)
                    : "Unknown"}
                </Table.Cell>
                <Table.Cell
                  color={
                    crypto.quote?.USD?.percent_change_24h > 0
                      ? "#16c784"
                      : "#ea3943"
                  }
                >
                  <Flex align={"center"}>
                    <Stat.Root>
                      <Stat.ValueText fontSize={"14px"}>
                        {`${helpers.plainFormatter.format(
                          crypto.quote?.USD?.percent_change_24h.toFixed(2)
                        )}%`}
                      </Stat.ValueText>
                    </Stat.Root>
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  {crypto.quote?.USD?.market_cap > 0
                    ? helpers.compactCurrencyFormatter.format(
                        crypto.quote?.USD?.market_cap
                      )
                    : crypto.self_reported_market_cap > 0
                    ? helpers.compactCurrencyFormatter.format(
                        crypto.self_reported_market_cap
                      )
                    : "Unknown"}
                </Table.Cell>
                <Table.Cell>
                  {crypto.circulating_supply > 0 ? (
                    <>
                      {helpers.plainNumberFormatter.format(
                        crypto.circulating_supply
                      )}
                      <Text as="span" fontWeight={"bold"} fontSize={"xs"}>
                        {" "}
                        {crypto.symbol}
                      </Text>
                    </>
                  ) : crypto.self_reported_circulating_supply > 0 ? (
                    <>
                      {helpers.plainNumberFormatter.format(
                        crypto.self_reported_circulating_supply
                      )}
                      <Text as="span" fontWeight={"bold"}>
                        {" "}
                        {crypto.symbol}
                      </Text>
                    </>
                  ) : (
                    "Unknown"
                  )}
                </Table.Cell>
                <Table.Cell>
                  {crypto.max_supply
                    ? helpers.plainNumberFormatter.format(crypto.max_supply)
                    : "--"}
                </Table.Cell>
                <Table.Cell>
                  $
                  {helpers.numberFormatter.format(
                    crypto.quote?.USD?.volume_24h
                  )}
                </Table.Cell>
              </Table.Row>
            ))
        )}
      </Table.Body>
    </Table.Root>
    </Table.ScrollArea>
    
  );
};

export default CryptoTable;
