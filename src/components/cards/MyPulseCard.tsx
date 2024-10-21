import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC } from "react";

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
  return (
    <RichCell onClick={onPress} before={<Avatar size={48} src={avatar} />} caption={role}>
      {name}
    </RichCell>
  );
};
