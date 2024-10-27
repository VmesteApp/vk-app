import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
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
import { MemberCard } from "../components";

export const AdminPulseTeam: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
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

      <Group header={<Header>{t("adminPulse.team")}</Header>}>
        {[pulse.founder_id, ...pulse.members].map((member, index) => (
          <MemberCard
            key={member}
            userID={member}
            role={index === 0 ? "founder" : "member"}
          />
        ))}
      </Group>
    </Panel>
  );
};
