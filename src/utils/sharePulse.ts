import bridge from "@vkontakte/vk-bridge";

export const sharePulse = (pulseId: number) => {
  try {
    bridge.send("VKWebAppShare", {
      link: `https://vk.com/app52209651#/pulse/preview/${pulseId}`,
    });
  } catch (error) {
    console.log(error);
  }
};
