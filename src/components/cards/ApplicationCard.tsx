import { Icon24ListDeleteOutline } from "@vkontakte/icons";
import { Avatar, RichCell, Text } from "@vkontakte/vkui";
import { FC } from "react";

interface IApplicationCardProps {
  avatar?: string;
  name: string;
  status: string;
}

interface IStatusProps {
  status: string;
}

const Status: FC<IStatusProps> = ({ status }) => {
  const style = {
    APPROVED: { color: "#51AF5A" },
    REJECTED: { color: "#ED413E" },
    PENDING: { color: "#AAABA8" },
  };
  const dict = {
    APPROVED: "Одобрено",
    REJECTED: "Отклонено",
    PENDING: "На рассмотрении",
  };

  // TODO: fix this
  return <Text style={style[status]}>{dict[status]}</Text>;
};

export const ApplicationCard: FC<IApplicationCardProps> = ({
  avatar,
  name,
  status,
}) => {
  return (
    <RichCell
      before={<Avatar size={48} src={avatar} />}
      caption={<Status status={status} />}
      after={<Icon24ListDeleteOutline fill="#AAABA8" />}
    >
      {name}
    </RichCell>
  );
};
