import { FC } from 'react';
import { Panel, PanelHeader, NavIdProps } from '@vkontakte/vkui';

export const Feed: FC<NavIdProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Feed</PanelHeader>
    </Panel>
  );
};
