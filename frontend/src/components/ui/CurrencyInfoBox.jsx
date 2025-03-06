import { Box, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "./color-mode";

const CurrencyInfoBox = ({ infoTitle, infoData }) => {
    const borderColor = useColorModeValue("#e5e5e5", "#18181b");

    return (
        <Box border={`1px solid ${borderColor}`} rounded={"xl"} p={1}>
            <Flex justify={"space-between"} mx={3}>
                <Box mr={18}>{infoTitle}</Box>
                <Box>{infoData}</Box>
            </Flex>
        </Box>
    );
};

export default CurrencyInfoBox;

