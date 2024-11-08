import { FC, useMemo } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Header,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { ErrorPlaceholder, MemberCard, PreviewPulseCard } from "../components";
import { usePulse } from "../hook";

export const ParticipantPulse: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const { pulse, loading, errorMessage } = usePulse(Number(params?.id));

  const members = useMemo(
    () => (pulse ? [pulse.founder_id, ...pulse.members] : []),
    [pulse]
  );

  if (errorMessage.length > 0) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        ></PanelHeader>
        <ErrorPlaceholder message={errorMessage} />
      </Panel>
    );
  }

  if (loading || !pulse) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        ></PanelHeader>
        <PanelSpinner />
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
      {pulse && <PreviewPulseCard pulse={pulse} />}

      <Group
        header={<Header>{t("participantPulse.members")}</Header>}
        description={t("participantPulse.description")}
      >
        {members.map((member, index) => (
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
