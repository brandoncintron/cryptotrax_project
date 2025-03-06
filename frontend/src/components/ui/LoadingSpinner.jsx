import { Box, Center, Container, Flex, Spinner, Text, VStack } from "@chakra-ui/react";


function LoadingSpinner({ h }) {
    return (
        <Box pos="absolute" inset="0" bg="bg/80" h={h}>
            <Center h="full">
                <VStack>
                    <Spinner color="teal.500" size="xl"/>
                    <Text color="colorPalette.600">Loading...</Text>
                </VStack>
            </Center>
        </Box>
    )
}

export default LoadingSpinner;