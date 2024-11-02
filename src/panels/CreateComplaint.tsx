import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Spinner,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
// import { useTranslation } from "react-i18next";
import { usePulsePreview } from "../hook";

export const CreateComplaint: FC<NavIdProps> = ({ id }) => {
  // const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  const { pulse, loading } = usePulsePreview(Number(params?.id));

  if (loading || !pulse) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        ></PanelHeader>
        <Spinner />
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Создать жалобу
      </PanelHeader>
    </Panel>
  );
};
