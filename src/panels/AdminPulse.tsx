import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  Spinner,
  PanelHeaderBack,
  Group,
  SimpleCell,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { usePulsePreview } from "../hook";
import {
  Icon28PrivacyOutline,
  Icon28SettingsOutline,
  Icon28UsersOutline,
} from "@vkontakte/icons";

export const AdminPulse: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
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
        {pulse.name}
      </PanelHeader>

      <Group>
        <SimpleCell
          onClick={() =>
            routeNavigator.push(`/pulse/admin/${pulse.id}/applications`)
          }
          expandable="auto"
          before={<Icon28PrivacyOutline />}
        >
          {t("adminPulse.applications")}
        </SimpleCell>
        <SimpleCell
          onClick={() => routeNavigator.push(`/pulse/admin/${pulse.id}/team`)}
          expandable="auto"
          before={<Icon28UsersOutline />}
        >
          {t("adminPulse.team")}
        </SimpleCell>
        <SimpleCell
          onClick={() =>
            routeNavigator.push(`/pulse/admin/${pulse.id}/settings`)
          }
          expandable="auto"
          before={<Icon28SettingsOutline />}
        >
          {t("adminPulse.settings")}
        </SimpleCell>
      </Group>
    </Panel>
  );
};
