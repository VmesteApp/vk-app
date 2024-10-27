import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { Avatar, RichCell } from "@vkontakte/vkui";
import { FC, useEffect, useState } from "react";
import api from "../../network";
import { useTranslation } from "react-i18next";

interface IMemberCardProps {
  userID: number;
  role: string;
  onPress: () => void;
}

export const MemberCard: FC<IMemberCardProps> = ({
  userID,
  role,
  onPress,
}: IMemberCardProps) => {
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    const fetchUserInfo = async (userID: number) => {
      try {
        const response = await api.get<{ userId: number; vkID: number }>(
          `/auth/profile/${userID}/vk`
        );

        if (response.status === 200) {
          const data = await bridge.send("VKWebAppGetUserInfo", {
            user_id: response.data.vkID,
          });

          setUserInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo(userID);
  }, [userID]);

  if (!userInfo) {
    return null;
  }

  return (
    <RichCell
      before={<Avatar size={48} src={userInfo.photo_200} />}
      caption={t(`participantPulse.${role}`)}
      onClick={onPress}
    >
      {userInfo.first_name} {userInfo.last_name}
    </RichCell>
  );
};
