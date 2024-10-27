import { FC, useEffect, useMemo, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Header,
  Spinner,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { IPulsePreview } from "../types";
import api from "../network";
import { MemberCard, PreviewPulseCard } from "../components";

export const ParticipantPulse: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const [pulse, setPulse] = useState<IPulsePreview | null>(null);

  useEffect(() => {
    const fetchPulse = async () => {
      try {
        const response = await api.get<IPulsePreview>(
          `/content/pulses/${params?.id}`
        );

        if (response.status === 200) {
          setPulse(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPulse();
  }, [params?.id]);

  const members = useMemo(
    () => (pulse ? [pulse.founder_id, ...pulse.members] : []),
    [pulse]
  );

  if (!pulse) {
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
