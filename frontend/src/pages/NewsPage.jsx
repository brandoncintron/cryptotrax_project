import useFetch from "@/hooks/useFetch";
import {
  Container,
  Card,
  Heading,
  Image,
  Box,
  Flex,
  Grid,
  HStack,
  Badge,
  Button,
  Center,
  Text,
  Alert,
} from "@chakra-ui/react";
import * as helpers from "@/utils/helpers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function News() {
  const {
    data: newsData,
    loading,
    err,
  } = useFetch(`/api/news`, null, "newsData", null);

  if (loading) return <LoadingSpinner />;
  if (err) return <p>Error: {err.message}</p>;

  const displayedNews = newsData?.slice(0, 10) || [];

  const sentimentColors = {
    positive: "green",
    neutral: "gray",
    negative: "red",
  };

  return (
    <Container w={"90vw"}>
      <Alert.Root status="error" my={6}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Disclaimer:</Alert.Title>
          <Alert.Description>
            The news articles featured on this page are outdated and
            provided solely for demonstration for this portfolio project. These articles do not
            reflect current news or events, and should not be considered a
            reliable source of up-to-date information.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Text textStyle="2xl" mb={4}>
        News
      </Text>

      {displayedNews.map((article, index) => (
        <Center key={article._id || index}>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Card.Root m={6} flexDirection="row" overflow="hidden" maxW="850px">
              <Image
                objectFit="cover"
                maxW="200px"
                maxH="100%"
                src={article.image_url}
                display={{base: "none", sm: "none", md: "flex"}}
              />
              <Box>
                <Card.Body w={{base: "350px", sm: "fit-content"}}>
                  <Card.Title mb="2">{article.title}</Card.Title>
                  <Card.Description>
                    {helpers.truncate(article.description)}
                  </Card.Description>
                  <HStack mt="4" flexWrap={{base: "wrap", sm: "nowrap"}}>
                    {article.sentiment_stats &&
                      article.sentiment_stats.split(",").map((pair, idx) => {
                        const [sentiment, value] = pair.split(":");
                        const colorScheme =
                          sentimentColors[sentiment.toLowerCase()];
                        return (
                          <Badge key={idx} colorPalette={colorScheme}>
                            {sentiment.charAt(0).toUpperCase() +
                              sentiment.slice(1)}
                            : {value}%
                          </Badge>
                        );
                      })}
                  </HStack>
                </Card.Body>
                <Card.Footer>
                  <Text fontSize={"xs"}>
                    Published {helpers.formatDate(article.pubDate)}
                  </Text>
                </Card.Footer>
              </Box>
            </Card.Root>
          </a>
        </Center>
      ))}
    </Container>
  );
}

export default News;
