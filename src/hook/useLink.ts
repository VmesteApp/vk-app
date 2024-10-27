import { usePlatform } from "@vkontakte/vkui";

export const useLink = () => {
  const platform = usePlatform();

  const openLink = (href: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.target = platform === "vkcom" ? "_black" : "_self";

    document.body.appendChild(link);

    link.click();
  };

  return {
    openLink,
  };
};
