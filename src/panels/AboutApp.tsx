import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Cell,
  Flex,
  Group,
  Image,
  Link,
  MiniInfoCell,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  Text,
  Title,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import logoColor from "../assets/img/logo-color.png";

export const AboutApp: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const { t } = useTranslation();

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {t("aboutApp.title")}
      </PanelHeader>

      <Group>
        <Flex align="center" justify="center">
          <Image src={logoColor} size={150} />
        </Flex>
      </Group>
      <SimpleCell multiline>
        <Text weight="2">{t("aboutApp.aboutApp")}</Text>
      </SimpleCell>
      <MiniInfoCell mode="accent" textWrap="full">
        {t("aboutApp.aboutCommunity")}{" "}
        <Link href="https://vk.com/club227970967">{t("aboutApp.vkGroup")}</Link>
      </MiniInfoCell>
      <Cell>
        <Title>{t("aboutApp.agreements")}</Title>
      </Cell>
      <MiniInfoCell mode="more" textWrap="full">
        <Link href="https://docs.google.com/document/d/1JIu0TRwWH6336eUJyKLO_42CXq4K9G0HyQ4T_OzNkLs/edit?usp=sharing">
          {t("aboutApp.userAgreement")}
        </Link>
      </MiniInfoCell>
      <MiniInfoCell mode="more" textWrap="full">
        <Link href="https://docs.google.com/document/d/15CC9RHjnWsVj8cJau1-Yflt0jg4gJupu-rpZgLLnkr0/edit?usp=sharing">
          {t("aboutApp.personalDataAgreement")}
        </Link>
      </MiniInfoCell>
    </Panel>
  );
};
