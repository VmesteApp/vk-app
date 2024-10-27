import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import api from "../network";
import { useEffect, useState } from "react";

export const useUserInfo = (userID: number) => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async (userID: number) => {
      setLoading(true);
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
      } finally {
        setLoading(false)
      }
    };

    fetchUserInfo(userID);
  }, [userID]);

  return {
    userInfo,
    loading,
  };
};
