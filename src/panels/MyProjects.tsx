import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';

export const MyProjects: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>MyProjects</PanelHeader>
    </Panel>
  );
};
