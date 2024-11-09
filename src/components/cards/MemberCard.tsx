import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLink } from "../../hook";
import { useUserInfo } from "../../hook/useUserInfo";
import { Icon28Delete } from "@vkontakte/icons";

interface IMemberCardProps {
  userID: number;
  role: string;
  onDelete?: () => void;
}

export const MemberCard: FC<IMemberCardProps> = ({
  userID,
  role,
  onDelete,
}: IMemberCardProps) => {
  const { t } = useTranslation();
  const { openLink } = useLink();
  const { userInfo } = useUserInfo(userID);

  if (!userInfo) {
    return null;
  }

  return (
    <RichCell
      before={<Avatar size={48} src={userInfo.photo_200} />}
      caption={t(`participantPulse.${role}`)}
      onClick={() => openLink(`https://vk.com/id${userInfo.id}`)}
      after={
        onDelete && (
          <RichCell.Icon
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            aria-hidden
          >
            <Icon28Delete />
          </RichCell.Icon>
        )
      }
    >
      {userInfo.first_name} {userInfo.last_name}
    </RichCell>
  );
};
