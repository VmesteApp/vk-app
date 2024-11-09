import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelSpinner,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { usePulse } from "../hook";
import { ErrorPlaceholder, MemberCard } from "../components";
// import api from "../network";

export const AdminPulseTeam: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
  const params = useParams<"id">();

  const { pulse, loading, errorMessage, currentUserIsAdmin, updatePulse } =
    usePulse(Number(params?.id));

  // const handleDeleteMember = useCallback(async (userID: number) => {
  //   try {
  //     const response = await api.delete(
  //       `/pulses/${pulse?.id}/members/${userID}`
  //     );

  //     if (response.status === 200) {
  //       await updatePulse();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [pulse?.id, updatePulse]);

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

  if (!currentUserIsAdmin) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        >
          {pulse.name}
        </PanelHeader>
        <ErrorPlaceholder message="You aren't admin" />
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
        <MemberCard
          key={pulse.founder_id}
          userID={pulse.founder_id}
          role="founder"
        />
        {pulse.members.map((member) => (
          <MemberCard
            key={member}
            userID={member}
            role="member"
            // onDelete={() => handleDeleteMember(member)}
          />
        ))}
      </Group>
    </Panel>
  );
};
