import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  ContentCard,
  CardGrid,
  Search,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const Feed: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        Лента
      </PanelHeader>

      <Group>
        <Search value={undefined} onChange={undefined} after={null} />
      </Group>

      <Group>
        <CardGrid size="l" spaced>
          <ContentCard
            subtitle="Событие"
            header="Творческая встреча с группой Сплин"
            src="https://journal.litres.ru/wp-content/uploads/2021/07/splin.jpg"
            text="Культовая рок-группа проведет встречу на улице Колотушкине, доме Пушкина"
          />
          <ContentCard
            onClick={() => {}}
            src="https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
            subtitle="Проект"
            header="Клуб путешественников 'Рассвет'"
            text="Мы открыли запись новых членов в наш клуб путешественников Рассвет! Присоединяйтесь к нам в незабываемых приключениях, которые оставят яркие воспоминания на всю жизнь."
          />
          <ContentCard
            onClick={() => {}}
            src="https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/9F47/production/_107957704_055407072-1.jpg.webp"
            subtitle="Событие"
            header="День фаната Шамана"
            text="День фаната Шамана: Праздник русской души, патриотизма и яркой музыки"
          />
        </CardGrid>
      </Group>
    </Panel>
  );
};
