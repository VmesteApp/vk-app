import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IMyPulseCardProps {
  avatar?: string;
  name: string;
  role: string;
  onPress: () => void;
}

export const MyPulseCard: FC<IMyPulseCardProps> = ({
  avatar,
  name,
  role,
  onPress,
}: IMyPulseCardProps) => {
  const { t } = useTranslation();

  return (
    <RichCell onClick={onPress} before={<Avatar size={48} src={avatar} />} caption={t(`participantPulse.${role}`)}>
      {name}
    </RichCell>
  );
};
