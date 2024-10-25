import { ContentCard, Group, Text, Title } from "@vkontakte/vkui";
import { FC } from "react";
import { IPulse } from "../../types";
import { useTranslation } from "react-i18next";

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
      header={<Title level="2">{pulse.name}</Title>}
      onClick={onPress}
      caption={
        <Group mode="plain">
          <Text style={{ color: "#0077FF" }}>
            {t(`pulseCard.category.${pulse.category}`).toUpperCase()}{" "}
          </Text>
          <Text>{pulse.short_description}</Text>
        </Group>
      }
    ></ContentCard>
  );
};
