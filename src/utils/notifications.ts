import bridge from "@vkontakte/vk-bridge";

export const enableNotifications = async () => {
  try {
    const { result } = await bridge.send("VKWebAppAllowNotifications");

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const disableNotifications = async () => {
  try {
    const { result } = await bridge.send("VKWebAppDenyNotifications");

    return result;
  } catch (error) {
    console.log(error);
  }
};
