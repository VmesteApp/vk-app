import { FC } from "react";
import {
  Panel,
  PanelHeader,
  NavIdProps,
  PanelHeaderBack,
  Group,
  Placeholder,
  Gallery,
  Text,
  MiniInfoCell,
  Spacing,
  FixedLayout,
  CellButton,
  FormItem,
  Textarea,
} from "@vkontakte/vkui";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Icon24SendOutline,
  Icon28GhostOutline,
} from "@vkontakte/icons";
import { mockedPulses } from "../mocks";

export const Pulse: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">();

  const pulse = mockedPulses.find((el) => el.id === Number(params?.id));

  if (!params?.id || !pulse) {
    return (
      <Panel id={id}>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        >
          Пульс
        </PanelHeader>

        <Group>
          <Placeholder icon={<Icon28GhostOutline width={56} height={56} />}>
            Такого импульса нет, пока что
          </Placeholder>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {pulse.name}
      </PanelHeader>
      <FixedLayout vertical="bottom" filled></FixedLayout>

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

      <Group>
        <MiniInfoCell>
          <Text style={{ color: "#0077FF" }}>
            {pulse.category.toUpperCase()}{" "}
            {pulse.tags.map((tag) => `#${tag}`).join(" ")}
          </Text>
        </MiniInfoCell>

        <Spacing size={12} />

        {pulse.description
          ?.split("\n")
          .map((sentence) => (
            <MiniInfoCell textWrap="full">{sentence}</MiniInfoCell>
          ))}
      </Group>

      <Group>
        <FormItem top="Анкета">
          <Textarea placeholder="Расскажи о себе и своей мотивации вступить в импульс" />
        </FormItem>
        <CellButton onClick={() => {}} centered before={<Icon24SendOutline />}>
          Подать заявку
        </CellButton>
      </Group>
    </Panel>
  );
};
