import bridge from "@vkontakte/vk-bridge";

export const setStorageValue = async (key: string, value: string) => {
  await bridge.send("VKWebAppStorageSet", {
    key,
    value,
  });
};

export const getStorageValue = async (key: string) => {
  const pair = await bridge.send("VKWebAppStorageGet", {
    keys: [key],
  });

  return pair.keys.length > 0 ? pair.keys[0].value : null;
};
