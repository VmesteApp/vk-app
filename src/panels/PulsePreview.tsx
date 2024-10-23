import { FC, useCallback, useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  MiniInfoCell,
  Spacing,
  FixedLayout,
  CellButton,
  FormItem,
  Textarea,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon24SendOutline } from "@vkontakte/icons";
import { IPulsePreview } from "../types";
import api from "../network";
import { useTranslation } from "react-i18next";

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
      console.log(body);
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

          {/* {pulse.images.length > 0 && (
            <Group>
              <Gallery
                slideWidth="90%"
                align="center"
                bullets={pulse.images.length > 1 && "light"}
              >
                {pulse.images.map((img) => (
                  <img key={img} src={img} style={{ display: "block" }} />
                ))}
              </Gallery>
            </Group>
          )} */}

          <Group>
            <MiniInfoCell mode="more">
              {t(`pulseCard.category.${pulse.category}`).toUpperCase()}
              {/* {pulse.tags.map((tag) => `#${tag}`).join(" ")} */}
            </MiniInfoCell>

            <Spacing size={12} />

            {pulse.description?.split("\n").map((sentence, id) => (
              <MiniInfoCell key={id} textWrap="full">
                {sentence}
              </MiniInfoCell>
            ))}
          </Group>

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
        </>
      )}
    </Panel>
  );
};
