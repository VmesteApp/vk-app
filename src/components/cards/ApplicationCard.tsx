import { Icon24ListDeleteOutline } from "@vkontakte/icons";
import { Avatar, RichCell, Text } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IApplicationCardProps {
  avatar?: string;
  name: string;
  status: string;
}

interface IStatusProps {
  status: string;
}

const Status: FC<IStatusProps> = ({ status }) => {
  const { t } = useTranslation();

  switch (status) {
    case "APPROVED":
      return (
        <Text style={{ color: "#51AF5A" }}>
          {t("myPulses.status.approved")}
        </Text>
      );
    case "REJECTED":
      return (
        <Text style={{ color: "#ED413E" }}>
          {t("myPulses.status.rejected")}
        </Text>
      );
    case "PENDING":
      return (
        <Text style={{ color: "#AAABA8" }}>{t("myPulses.status.pending")}</Text>
      );
    default:
      return null;
  }
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
