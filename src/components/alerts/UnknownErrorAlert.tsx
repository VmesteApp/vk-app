import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Alert } from "@vkontakte/vkui";
import { FC } from "react";
import { useLink } from "../../hook";
import { useTranslation } from "react-i18next";

export const UnknownErrorAlert: FC = () => {
  const routeNavigator = useRouteNavigator();
  const { openLink } = useLink();
  const { t } = useTranslation();

  return (
    <Alert
      actions={[
        {
          title: t("unknownErrorAlert.techSupportBtn"),
          mode: "destructive",
          action: () => openLink("https://vk.com/im?media=&sel=-227970967"),
        },
        {
          title: t("unknownErrorAlert.cancelBtn"),
          mode: "cancel",
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => routeNavigator.hidePopout()}
      header={t("unknownErrorAlert.title")}
      text={t("unknownErrorAlert.text")}
    />
  );
};
