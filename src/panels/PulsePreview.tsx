import { FC, useCallback, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  FixedLayout,
  CellButton,
  FormItem,
  Textarea,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24FlagStart, Icon24SendOutline } from "@vkontakte/icons";
import { IPulsePreview } from "../types";
import api from "../network";
import { useTranslation } from "react-i18next";
import { PreviewPulseCard } from "../components";

export const PulsePreview: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
  const params = useParams<"id">();

  const [pulse, setPulse] = useState<IPulsePreview | null>(null);
  const [message, setMessage] = useState("");

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

  const handleCreateApplication = useCallback(async () => {
    try {
      const body = {
        pulse_id: pulse?.id,
        message,
      };
      const response = await api.post("/content/application", body);

      if (response.status === 200) {
        routeNavigator.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [message, pulse?.id, routeNavigator]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {pulse?.name}
      </PanelHeader>
      {pulse && (
        <>
          <FixedLayout vertical="bottom" filled></FixedLayout>

          <PreviewPulseCard pulse={pulse} />

          <Group>
            <FormItem top={t("pulsePreview.form")}>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("pulsePreview.placeholder")}
              />
            </FormItem>
            <CellButton
              onClick={handleCreateApplication}
              centered
              before={<Icon24SendOutline />}
            >
              {t("pulsePreview.submit")}
            </CellButton>
          </Group>

          <Group>
            <CellButton
              centered
              before={<Icon24FlagStart />}
              mode="danger"
              onClick={() =>
                routeNavigator.push(`/pulse/${pulse.id}/complaint`)
              }
            >
              {t("Пожаловаться")}
            </CellButton>
          </Group>
        </>
      )}
    </Panel>
  );
};
