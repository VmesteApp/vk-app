import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { FC, useState } from "react";
import { CreatePulseForm, ICreatePulsePayload } from "../components";

const defaultValue: ICreatePulsePayload = {
  name: "",
  category: "",
  description: "",
  short_description: "",
  tags: [],
};

export const CreatePulse: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [pulse, setPulse] = useState<ICreatePulsePayload>(defaultValue);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Создать Импульс
      </PanelHeader>

      <CreatePulseForm
        data={pulse}
        handleChange={(newValue) => setPulse({ ...pulse, ...newValue })}
        handleSubmit={() => {}}
        tagsAsset={[
          { value: "тэг1", label: "тэг1" },
          { value: "тэг2", label: "тэг2" },
          { value: "тэг3", label: "тэг3" },
          { value: "тэг4", label: "тэг4" },
        ]}
      />
    </Panel>
  );
};
