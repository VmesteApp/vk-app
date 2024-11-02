import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IMyPulseCardProps {
  avatar?: string;
  name: string;
  role: string;
  blocked: boolean;
  onPress: () => void;
}

export const MyPulseCard: FC<IMyPulseCardProps> = ({
  avatar,
  name,
  role,
  blocked,
  onPress,
}: IMyPulseCardProps) => {
  const { t } = useTranslation();

  return (
    <RichCell
      style={{ opacity: blocked ? 0.5 : 1 }}
      onClick={onPress}
      before={<Avatar size={48} src={avatar} />}
      caption={t(`participantPulse.${role}`)}
    >
      {name}
    </RichCell>
  );
};
