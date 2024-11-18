import bridge from "@vkontakte/vk-bridge";

export const shareApp = async () => {
  try {
    const { result } = await bridge.send("VKWebAppRecommend");
    return result;
  } catch (error) {
    console.log(error);
  }

  return false;
};
