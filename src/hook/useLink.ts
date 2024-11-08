import { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { usePlatform } from "@vkontakte/vkui";

export const useLink = () => {
  const platform = usePlatform();
  const { vk_platform } = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  );

  const openLink = (href: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.target =
      platform === "vkcom" || vk_platform === "mobile_web" ? "_black" : "_self";

    document.body.appendChild(link);

    link.click();
  };

  return {
    openLink,
  };
};
