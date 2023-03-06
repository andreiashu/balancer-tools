import { Badge, Button, HStack, Text, VStack } from "@chakra-ui/react";

interface IOwnedPool {
  onClick: () => void;
  address: string;
  type: string;
  ratio?: string;
  name: string;
  isSelected: boolean;
}

export function OwnedPool({
  onClick,
  address,
  type,
  ratio,
  name,
  isSelected,
}: IOwnedPool) {
  const backgroundColor = isSelected ? "blue.800" : "gray.800";

  return (
    <Button
      p="2"
      h="20"
      w="full"
      background={backgroundColor}
      alignSelf="stretch"
      role="group"
      _hover={{
        background: "blue.800",
        borderRadius: 0,
      }}
      color={backgroundColor}
      onClick={onClick}
    >
      <VStack spacing="1" w={"full"}>
        <HStack alignSelf="stretch">
          <Text
            fontFamily="Inter"
            lineHeight="1.5"
            fontWeight="bold"
            fontSize="1rem"
            color="gray.200"
            _groupHover={{
              color: "yellow.400",
            }}
          >
            {name}
          </Text>
          {ratio && (
            <Badge
              p="1px"
              colorScheme="blue"
              _groupHover={{ background: "yellow.100" }}
              background={isSelected ? "yellow.100" : "blue.200"}
            >
              {ratio}
            </Badge>
          )}
        </HStack>
        <HStack spacing={3} w={"full"}>
          <Badge
            p="1"
            variant="outline"
            _groupHover={{
              color: "gray.400",
            }}
          >
            {type}
          </Badge>
          <Text
            fontFamily="Inter"
            lineHeight="1.2"
            fontSize="0.75rem"
            color="gray.500"
            _groupHover={{
              color: "gray.400",
            }}
          >
            {address}
          </Text>
        </HStack>
      </VStack>
    </Button>
  );
}
