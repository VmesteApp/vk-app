import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC } from "react";

interface IMyPulseCardProps {
  avatar?: string;
  name: string;
  role: string;
}

export const MyPulseCard: FC<IMyPulseCardProps> = ({
  avatar,
  name,
  role,
}: IMyPulseCardProps) => {
  return (
    <RichCell before={<Avatar size={48} src={avatar} />} caption={role}>
      {name}
    </RichCell>
  );
};
