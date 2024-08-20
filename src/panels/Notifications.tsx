import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';

export const Notifications: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Notifications</PanelHeader>
    </Panel>
  );
};
