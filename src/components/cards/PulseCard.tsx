import { ContentCard, Group, Text, Title } from "@vkontakte/vkui";
import { FC } from "react";

interface IPulseCardProps {
  name: string;
  category: string;
  images: string[];
  tags: string[];
  shortDescription: string;
  onPress: () => void;
}

export const PulseCard: FC<IPulseCardProps> = ({
  name,
  category,
  tags = [],
  images = [""],
  shortDescription,
  onPress,
}: IPulseCardProps) => {
  return (
    <ContentCard
      src={images[0]}
      header={<Title level="2">{name}</Title>}
      onClick={onPress}
      caption={
        <Group mode="plain">
          <Text style={{ color: "#0077FF" }}>
            {category.toUpperCase()} {tags.map((tag) => `#${tag}`).join(" ")}
          </Text>
          <Text>{shortDescription}</Text>
        </Group>
      }
    ></ContentCard>
  );
};
