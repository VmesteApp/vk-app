import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  CellButton,
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Spinner,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { usePulsePreview } from "../hook";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import api from "../network";

export const AdminPulseSettings: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
  const params = useParams<"id">();

  const { pulse, loading } = usePulsePreview(Number(params?.id));

  const handleDeletePulse = async () => {
    try {
      const response = await api.delete(`content/pulse/${pulse?.id}`);

      if (response.status === 200) {
        routeNavigator.push("/my-pulses");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {pulse.name}
      </PanelHeader>

      <Group
        header={<Header>{t("adminPulseSettings.dangerZone")}</Header>}
        description={t("adminPulseSettings.warning")}
      >
        <CellButton
          onClick={handleDeletePulse}
          before={<Icon24DeleteOutline />}
          mode="danger"
        >
          {t("adminPulseSettings.deletePulse")}
        </CellButton>
      </Group>
    </Panel>
  );
};
