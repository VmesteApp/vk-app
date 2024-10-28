import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Spinner,
} from "@vkontakte/vkui";
import { FC, useMemo } from "react";
import { usePulseApplications, usePulsePreview } from "../hook";
import { ApplicationCardWithActions } from "../components";
import { useTranslation } from "react-i18next";

export const AdminPulseApplications: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
  const params = useParams<"id">();

  const { pulse, loading: loadingPulse } = usePulsePreview(Number(params?.id));
  const {
    applications,
    loading: loadingApplications,
    fetchApplications,
  } = usePulseApplications(Number(params?.id));

  const pendingApplications = useMemo(
    () =>
      applications.filter((application) => application.status === "PENDING"),
    [applications]
  );

  const handleSetVerdict = (applicationdID: number, status: string) => {
    try {
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingPulse || !pulse || loadingApplications) {
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

      {pendingApplications.length > 0 ? (
        <Group header={<Header>{t("adminPulse.applications")}</Header>}>
          {pendingApplications.map((application) => (
            <ApplicationCardWithActions
              key={application.application_id}
              application={application}
              onApproved={() =>
                handleSetVerdict(application.application_id, "APPROVED")
              }
              onRejected={() =>
                handleSetVerdict(application.application_id, "REJECTED")
              }
            />
          ))}
        </Group>
      ) : (
        <Placeholder.Container>
          <Placeholder.Text>{t("adminPulseApplications.applicationsNotFound")}</Placeholder.Text>
        </Placeholder.Container>
      )}
    </Panel>
  );
};
