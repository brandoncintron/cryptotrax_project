import { Box, Input, Field, defineStyle } from "@chakra-ui/react";

const searchCrypto = (e) => {
    e.preventDefault();
};

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <form onSubmit={searchCrypto}>
            <Field.Root w={"280px"}>
                <Box pos="relative" w={"full"}>
                    <Input
                        className="peer"
                        placeholder=""
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Field.Label css={floatingStyles}>Search For Cryptos</Field.Label>
                </Box>
            </Field.Root>
        </form>
    );
};


// For Chakra input element
const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
        color: "fg.muted",
        top: "2.5",
        insetStart: "3",
    },
    _peerFocusVisible: {
        color: "fg",
        top: "-3",
        insetStart: "2",
    },
})

export default SearchBar