import { FC } from "react";
import { Panel, PanelHeader, NavIdProps } from "@vkontakte/vkui";

export const Project: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Project</PanelHeader>
    </Panel>
  );
};
