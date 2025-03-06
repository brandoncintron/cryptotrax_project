import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CurrencyInfoBox from "@/components/ui/CurrencyInfoBox";
import * as helpers from "@/utils/helpers";
import * as formatHelper from "@/utils/ScientificFormat";
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Separator,
  Tag,
  Image,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaFacebook,
  FaReddit,
  FaGlobe,
  FaFileAlt,
  FaGithub,
} from "react-icons/fa";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Converter from "@/components/Converter";
import { MdFavorite } from "react-icons/md";
import { FavoritesContext } from "@/contexts/FavoritesContext";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";


// 2 api calls, 1 call for metadata if id isn't already in session storage and if page refreshed, other call once every 3 mins
function CurrencyPage() {
  const borderColor = useColorModeValue("#e5e5e5", "#18181b");
  const { id } = useParams();
  
  // Fetch the currency data
  const {
    data: cryptoData,
    loading,
    error,
  } = useFetch("/api/currency/:id", id, `cryptoData_${id}`);
  
  // Fetch the crypto meta data
  const { data: cryptoMeta } = useFetch(
    "/api/metadata/:id",
    id,
    `cryptoMetaData`,
    null
  );

  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Box>{error}</Box>;
  }

  if (!cryptoData || !cryptoMeta) {
    return <LoadingSpinner />;
  }
  const crypto = cryptoData[id];
  const metaData = cryptoMeta[id];

  // Check if crypto is favorited
  const isFavorited = favorites.includes(crypto.id);

  return (
    <Container py={12} px={8}>
      <Flex
        justify={"space-between"}
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row" }}
      >
        {/* The Crypto's Stats and Details */}
        <Box
          border={`1px solid ${borderColor}`}
          rounded={"xl"}
          p={4}
          mr={16}
          minW={"fit-content"}
          maxW={"fit-content"}
          h={"fit-content"}
        >
          <Text pb={2} fontSize={"xs"} color={"GrayText"}>
            Added {helpers.formatDate(crypto.date_added)}
          </Text>
          <Flex align={"center"} minW={"260px"}>
            <Image src={metaData.logo} boxSize="32px" mr={2} />
            <Heading
              size={"4xl"}
              w={"fit-content"}
              wordWrap={"break-word"}
              textOverflow={"ellipsis"}
              textWrap={"wrap"}
            >
              {crypto.name}
            </Heading>
            <Text ml={2} color={"#ccc"} alignSelf={"end"}>
              {crypto.symbol}
            </Text>
            
          </Flex>
          <Heading size={"2xl"} mt={2} mb={4} position={"relative"}>
            {crypto.quote?.USD?.price
              ? formatHelper.formatPriceSubscript(crypto.quote.USD.price)
              : "Unknown"}
            <Box
              position={"absolute"}
              right={"0"}
              top={"0.5"}
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Toggle favorite status
                if (isFavorited) {
                  removeFavorite(crypto.id);
                  toaster.create({
                    description: `Removed ${crypto.name} from favorites`,
                    type: "error",
                    max: 3,
                  });
                } else {
                  addFavorite(crypto);
                  toaster.create({
                    description: `Successfully added ${crypto.name} to favorites`,
                    type: "success",
                    max: 3,
                  });
                }
              }}
            >
              <MdFavorite
                color={isFavorited ? "#ea3943" : "gray"}
                size={"28px"}
              />
            </Box>
          </Heading>

          <Separator mt={2} mb={4} />

          <Stack>
            {/* Market Cap Stat */}
            <CurrencyInfoBox
              infoTitle={"Market Cap"}
              infoData={
                crypto.quote?.USD?.market_cap > 0
                  ? helpers.plainNumberFormatter.format(
                      crypto.quote?.USD?.market_cap
                    )
                  : crypto.self_reported_market_cap > 0
                  ? helpers.plainNumberFormatter.format(
                      crypto.self_reported_market_cap
                    )
                  : "Unknown"
              }
            />

            {/* 24hr Volume Stat */}
            <CurrencyInfoBox
              infoTitle={"Volume (24h)"}
              infoData={`$${helpers.plainNumberFormatter.format(
                crypto.quote?.USD?.volume_24h
              )}`}
            />

            {/* Circulating Supply Stat */}
            <CurrencyInfoBox
              infoTitle={"Circulating Supply"}
              infoData={
                crypto.circulating_supply > 0
                  ? helpers.plainNumberFormatter.format(
                      crypto.circulating_supply
                    )
                  : crypto.self_reported_circulating_supply > 0
                  ? helpers.plainNumberFormatter.format(
                      crypto.self_reported_circulating_supply
                    )
                  : "Unknown"
              }
            />

            {/* Total supply Stat */}
            <CurrencyInfoBox
              infoTitle={"Total supply"}
              infoData={
                crypto.total_supply
                  ? helpers.plainNumberFormatter.format(crypto.total_supply)
                  : "--"
              }
            />

            {/* Max supply Stat */}
            <CurrencyInfoBox
              infoTitle={"Max supply"}
              infoData={
                crypto.max_supply
                  ? helpers.plainNumberFormatter.format(crypto.max_supply)
                  : "--"
              }
            />

            <Separator mt={2} />

            {/* Official Links */}
            <Heading size="2xl">Official Links</Heading>
            <Box>
              {metaData.urls?.website?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`website-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaGlobe} boxSize={4} />
                  <Tag.Label>Website</Tag.Label>
                </Tag.Root>
              ))}
              {metaData.urls?.technical_doc?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`technical_doc-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaFileAlt} boxSize={4} />
                  <Tag.Label>Technical Doc</Tag.Label>
                </Tag.Root>
              ))}
              {metaData.urls?.source_code?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`source_code-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaGithub} boxSize={4} />
                  <Tag.Label>Source Code</Tag.Label>
                </Tag.Root>
              ))}
            </Box>

            {/* Socials */}
            <Heading size="2xl">Socials</Heading>
            <Box>
              {metaData.urls?.twitter?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`twitter-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaTwitter} boxSize={4} />
                  <Tag.Label>Twitter</Tag.Label>
                </Tag.Root>
              ))}
              {metaData.urls?.facebook?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`facebook-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaFacebook} boxSize={4} />
                  <Tag.Label>Facebook</Tag.Label>
                </Tag.Root>
              ))}
              {metaData.urls?.reddit?.map((url) => (
                <Tag.Root
                  as="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`reddit-${url}`}
                  m={2}
                >
                  <Tag.StartElement as={FaReddit} boxSize={4} />
                  <Tag.Label>Reddit</Tag.Label>
                </Tag.Root>
              ))}
            </Box>
          </Stack>
        </Box>

        {/* Description, Converter, Tags */}
        <Box h={"fit-content"} mt={{base: 8, sm: 8, md: 8, lg: 0}}>
          {/* The Crypto's Description */}
          <Box
            border={`1px solid ${borderColor}`}
            h={"fit-content"}
            p={4}
            rounded={"xl"}
          >
            <Flex direction="column">
              <Heading size={"2xl"}>Description</Heading>
              <Text>{metaData.description}</Text>
            </Flex>
          </Box>
          {/* Crypto to USD Converter */}
          <Converter crypto={crypto} />

          {/* The Crypto's Tags */}
          <Box
            p={4}
            mt={12}
            border={`1px solid ${borderColor}`}
            h={"fit-content"}
            rounded={"xl"}
          >
            <Heading size={"2xl"}>Tags</Heading>
            <Flex
              flexWrap={"wrap"}
              mt={4}
              justifyContent={"space-evenly"}
              overflowY={"scroll"}
              w={"100%"}
              maxH={"108px"}
            >
              {metaData["tag-names"]?.map((tag, index) => (
                <Tag.Root key={index} size={"lg"} m={2}>
                  <Tag.Label>{tag}</Tag.Label>
                </Tag.Root>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

export default CurrencyPage;
