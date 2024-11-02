import { ContentCard, Flex, Group, Text, Title } from "@vkontakte/vkui";
import { FC } from "react";
import { IPulse } from "../../types";
import { useTranslation } from "react-i18next";
import { PulsePopover } from "../popovers";

interface IPulseCardProps {
  pulse: IPulse;
  onPress: () => void;
}

export const PulseCard: FC<IPulseCardProps> = ({
  pulse,
  onPress,
}: IPulseCardProps) => {
  const { t } = useTranslation();
  const logo = pulse.images.length > 0 ? pulse.images[0] : "";

  return (
    <ContentCard
      src={logo}
      header={
        <Flex direction="row" align="center">
          <Title level="2" style={{ flex: 1 }}>
            {pulse.name}
          </Title>
          <PulsePopover />
        </Flex>
      }
      onClick={onPress}
      caption={
        <Group mode="plain">
          <Text style={{ color: "#0077FF" }}>
            {t(`pulseCard.category.${pulse.category}`).toUpperCase()}{" "}
            {pulse.tags.map((tag) => `#${tag.name}`).join(" ")}
          </Text>
          <Text>{pulse.short_description}</Text>
        </Group>
      }
    ></ContentCard>
  );
};
