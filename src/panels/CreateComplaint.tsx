import { FC, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  RichCell,
  Avatar,
  Group,
  FormItem,
  Textarea,
  CellButton,
  MiniInfoCell,
  PanelSpinner,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useTranslation } from "react-i18next";
import { usePulsePreview } from "../hook";
import { Icon24SendOutline } from "@vkontakte/icons";
import api from "../network";

export const CreateComplaint: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();
  const [message, setMessage] = useState<string>("");

  const { pulse, loading } = usePulsePreview(Number(params?.id));

  const handleCreateComplaint = async () => {
    if (!message.length || !pulse) return;

    try {
      const body = {
        message,
      };

      const response = await api.post(
        `/content/pulses/${pulse.id}/complaint`,
        body
      );

      if (response.status) {
        routeNavigator.push("/");
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
        <PanelSpinner />
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("complaints.title")}
      </PanelHeader>

      <Group>
        <RichCell
          onClick={() => routeNavigator.push(`/pulse/preview/${pulse.id}`)}
          before={
            pulse.images.length > 0 ? (
              <Avatar size={48} src={pulse.images[0]} />
            ) : null
          }
        >
          {pulse.name}
        </RichCell>
      </Group>

      <Group>
        <MiniInfoCell textWrap="full">{t("complaints.info")}</MiniInfoCell>
        <FormItem
          topNode={
            <FormItem.Top>
              <FormItem.TopAside required>
                {message.length}/200
              </FormItem.TopAside>
            </FormItem.Top>
          }
          required
        >
          <Textarea
            rows={15}
            maxLength={200}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("complaints.placeholder")}
          />
        </FormItem>
        <CellButton
          disabled={!message.trim().length}
          onClick={handleCreateComplaint}
          centered
          before={<Icon24SendOutline />}
        >
          {t("complaints.submit")}
        </CellButton>
      </Group>
    </Panel>
  );
};
