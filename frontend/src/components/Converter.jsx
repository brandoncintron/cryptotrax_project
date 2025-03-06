import { Flex, Box, Heading, Text, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import * as helpers from "@/utils/helpers";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";

function Converter({ crypto }) {
  const borderColor = useColorModeValue("#e5e5e5", "#18181b");
  
  const cryptoPrice = crypto.quote.USD.price;
  
  const [cryptoAmount, setCryptoAmount] = useState("1");
  const [usdAmount, setUsdAmount] = useState(() => {
    const initialValue = 1 * cryptoPrice;
    if (initialValue < 0.0001) return initialValue.toFixed(12);
    if (initialValue < 1) return initialValue.toFixed(8);
    return helpers.plainFormatter.format(initialValue);
  });

  const formatUSD = (value) => {
    if (value === 0) return "0.00";
    if (value < 0.0001) return value.toFixed(12);
    if (value < 1) return value.toFixed(8);
    return helpers.plainFormatter.format(value.toFixed(2));
  };

  const handleCryptoChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, "");
    setCryptoAmount(cleanValue);

    const usdValue = parseFloat(cleanValue || 0) * cryptoPrice;
    setUsdAmount(formatUSD(usdValue));
  };

  const handleUsdChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, "");
    setUsdAmount(cleanValue);

    const cryptoValue = parseFloat(cleanValue || 0) / cryptoPrice;
    setCryptoAmount(helpers.plainFormatter.format(cryptoValue.toFixed(8)));
  };

  return (
    <Flex
      w={"fit-content"}
      p={4}
      mt={12}
      border={`1px solid ${borderColor}`}
      rounded={"xl"}
    >
      <Box>
        <Heading size={"2xl"} mb={3}>
          {crypto.symbol} to USD Converter
        </Heading>
        <Flex
          border={`1px solid ${borderColor}`}
          rounded={"xl"}
          flexDir={{base: "column", sm: "row"}}
          h={"fit-content"}
          justify={"space-between"}
          align={"center"}
          py={5}
          px={2}
        >
          <Flex
            w={"200px"}
            h={"inherit"}
            justify={"space-between"}
            align={"center"}

            borderRight={{base: "none", sm: "1px solid"}}
            pr={{base: "none", sm: 2}}
          >
            <Text>{crypto.symbol}</Text>
            <InputGroup w={"150px"}>
              <Input
                size={"xs"}
                rounded={"lg"}
                pr={6}
                value={cryptoAmount}
                onChange={(e) => handleCryptoChange(e.target.value)}
              />
            </InputGroup>
          </Flex>

          <Flex
            w={"200px"}
            h={"inherit"}
            justify={"space-between"}
            align={"center"}
            pl={{base: "none", sm: 2}}
          >
            <Text>USD</Text>
            <InputGroup startElement="$">
              <Input
                size={"xs"}
                rounded={"lg"}
                w={"150px"}
                value={usdAmount}
                onChange={(e) => handleUsdChange(e.target.value)}
              />
            </InputGroup>
          </Flex>

        </Flex>
      </Box>
    </Flex>
  );
}

export default Converter;
