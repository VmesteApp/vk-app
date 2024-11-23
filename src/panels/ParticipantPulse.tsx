import { FC, useCallback, useMemo } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Header,
  PanelSpinner,
  CellButton,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { ErrorPlaceholder, MemberCard, PreviewPulseCard } from "../components";
import { usePulse } from "../hook";
import { sharePulse } from "../utils";
import { Icon24MinusSquareOutline, Icon24Share } from "@vkontakte/icons";
import api from "../network";

export const ParticipantPulse: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const { pulse, loading, errorMessage } = usePulse(Number(params?.id));

  const members = useMemo(
    () => (pulse ? [pulse.founder_id, ...pulse.members] : []),
    [pulse]
  );

  const handleLeave = useCallback(async () => {
    try {
      const response = await api.delete(`/content/pulses/${params?.id}/leave`);

      if (response.status === 200) {
        routeNavigator.push("/my-pulses");
      }
    } catch (error) {
      console.log(error);
    }
  }, [params?.id, routeNavigator]);

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
      <Group>
        <CellButton
          onClick={() => sharePulse(pulse.id)}
          before={<Icon24Share />}
          mode="primary"
        >
          {t("complaints.share")}
        </CellButton>
      </Group>
      <Group>
        <CellButton
          onClick={handleLeave}
          before={<Icon24MinusSquareOutline />}
          mode="danger"
        >
          {t("participantPulse.leave")}
        </CellButton>
      </Group>
    </Panel>
  );
};
