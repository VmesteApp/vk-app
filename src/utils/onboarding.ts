import bridge from "@vkontakte/vk-bridge";
import { getBase64FromUrl } from "./getBase64FromUrl";
import onboarding1 from "../assets/img/onboarding-1.png";
import onboarding2 from "../assets/img/onboarding-2.png";
import onboarding3 from "../assets/img/onboarding-3.png";
import onboarding4 from "../assets/img/onboarding-4.png";
import { useTranslation } from "react-i18next";
import { getStorageValue, setStorageValue } from "./vkStorage";
import { ONBOARDING_COMPLETED } from "../constants";

export const useOnboarding = () => {
  const { t } = useTranslation();

  return {
    startOnboarding: async () => {
      const completed = await getStorageValue(ONBOARDING_COMPLETED);
      if (completed === "true") {
        return;
      }

      const blod1 = await getBase64FromUrl(onboarding1);
      const blod2 = await getBase64FromUrl(onboarding2);
      const blod3 = await getBase64FromUrl(onboarding3);
      const blod4 = await getBase64FromUrl(onboarding4);

      bridge
        .send("VKWebAppShowSlidesSheet", {
          slides: [
            {
              media: {
                blob: blod1,
                type: "image",
              },
              title: t("onboarding.app.title"),
              subtitle: t("onboarding.app.subtitle"),
            },
            {
              media: {
                blob: blod2,
                type: "image",
              },
              title: t("onboarding.pulse.title"),
              subtitle: t("onboarding.pulse.subtitle"),
            },
            {
              media: {
                blob: blod4,
                type: "image",
              },
              title: t("onboarding.push.title"),
              subtitle: t("onboarding.push.subtitle"),
            },
            {
              media: {
                blob: blod3,
                type: "image",
              },
              title: t("onboarding.lenta.title"),
              subtitle: t("onboarding.lenta.subtitle"),
            },
          ],
        })
        .then(async (data) => {
          if (data.result) {
            await setStorageValue(ONBOARDING_COMPLETED, "true");
          }
        });
    },
  };
};
