import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';

export const Profile: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Profile</PanelHeader>
    </Panel>
  );
};
