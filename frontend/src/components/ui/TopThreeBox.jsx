import {
  Box,
  Card,
  Stat,
  Badge,
  FormatNumber,
  VStack,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as helpers from "@/utils/helpers";
import { Link } from "react-router-dom";

const MotionBox = motion.create(Box);

const TopThreeBox = ({ crypto, logo, mb, rank }) => {
  if (!crypto) return null;
  
  return (
    <MotionBox
      position="relative"
      mx={4}
      mb={mb}
      w="160px"
      // Bounce animation: moves up by 10px and then back down.
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4,
        // Each box's animation starts offset by rank * 2 seconds
        delay: rank * 2,
      }}
    >  
      <Link to={`/currency/${crypto.id}`}>
        <Card.Root variant={"outline"}>
          <Card.Body>
            <Stat.Root p={2}>
              <VStack>
                <Image src={logo} boxSize="48px" />
                {crypto.symbol}
                <Stat.ValueText fontSize="20px">
                  <FormatNumber
                    value={crypto.quote.USD.price}
                    style="currency"
                    currency="USD"
                  />
                </Stat.ValueText>
                <Badge
                  colorPalette={
                    crypto.quote?.USD?.percent_change_24h > 0 ? "green" : "red"
                  }
                  gap="0"
                >
                  {helpers.plainFormatter.format(
                    crypto.quote.USD.percent_change_24h
                  ) < 0 ? (
                    <Stat.DownIndicator />
                  ) : (
                    <Stat.UpIndicator />
                  )}
                  {`${helpers.plainFormatter.format(
                    crypto.quote.USD.percent_change_24h
                  )}%`}
                </Badge>
                <Stat.HelpText>since yesterday</Stat.HelpText>
              </VStack>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
      </Link>
    </MotionBox>
  );
};

export default TopThreeBox;
