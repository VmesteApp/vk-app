import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { CreatePulseForm, ICreatePulsePayload } from "../components";
import { ITag } from "../types";
import api from "../network";
import { useTranslation } from "react-i18next";

const defaultValue: ICreatePulsePayload = {
  name: "",
  category: "event",
  description: "",
  short_description: "",
  tags: [],
  images: [],
};

export const CreatePulse: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();
  const [pulse, setPulse] = useState<ICreatePulsePayload>(defaultValue);
  const [tags, setTags] = useState<ITag[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get<{ tags: ITag[] }>("/content/tags");

        if (response.status === 200) {
          setTags(response.data.tags);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTags();
  }, []);

  // validation form
  useEffect(() => {
    const isValid =
      pulse.description &&
      pulse.name &&
      pulse.short_description &&
      pulse.tags.length >= 3 &&
      pulse.images.length >= 1;

    setIsFormValid(Boolean(isValid));
  }, [pulse]);

  const tagsAsset = useMemo(
    () =>
      tags.map((tag) => ({
        value: String(tag.id),
        label: tag.name,
      })),
    [tags]
  );

  const handleSubmit = useCallback(async () => {
    try {
      const body = {
        ...pulse,
        tags: pulse.tags.map((tag) => tag.value).join(","),
        images: undefined,
      };
      const response = await api.post<{
        pulse_id: number;
      }>("/content/pulse", body);

      if (response.status === 200) {
        const pulseID = response.data.pulse_id;

        const formData = new FormData();
        pulse.images.forEach((file) => {
          formData.append("file", file);
        });

        const imageResponse = await api.post(
          `/content/pulse/${pulseID}/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.status === 200) {
          routeNavigator.back();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [pulse, routeNavigator]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("createPulse.title")}
      </PanelHeader>

      <CreatePulseForm
        data={pulse}
        handleChange={(newValue) => setPulse({ ...pulse, ...newValue })}
        handleSubmit={handleSubmit}
        tagsAsset={tagsAsset}
        disabled={!isFormValid}
      />
    </Panel>
  );
};
