import { Icon24Dismiss } from "@vkontakte/icons";
import {
  CellButton,
  ChipsSelect,
  FormItem,
  Gradient,
  Group,
  Header,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  PanelHeaderClose,
  PanelHeaderSubmit,
  useAdaptivityConditionalRender,
  useAdaptivityWithJSMediaQueries,
  usePlatform,
} from "@vkontakte/vkui";
import { FC } from "react";

interface IPulsesFilterModalProps {
  id: string;
}

export const PulsesFilterModal: FC<IPulsesFilterModalProps> = ({
  id,
}: IPulsesFilterModalProps) => {
  const { sizeX } = useAdaptivityConditionalRender();
  const { isDesktop } = useAdaptivityWithJSMediaQueries();
  const platform = usePlatform();

  const modalBack = () => {};

  return (
  
      <ModalPage
        id={id}
        onClose={modalBack}
        settlingHeight={100}
        height={isDesktop ? 250 : "70%"}
        hideCloseButton={platform === "ios"}
        header={
          <ModalPageHeader
            before={
              sizeX.compact &&
              platform === "android" && (
                <PanelHeaderClose
                  className={sizeX.compact.className}
                  onClick={modalBack}
                />
              )
            }
            after={
              platform === "ios" && (
                <PanelHeaderButton onClick={modalBack}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
          ></ModalPageHeader>
        }
      >
        <>
          <Gradient mode="tint">
            {/* <Placeholder
    icon={<Avatar size={96} src={randomUser.photo_100} />}
    header={randomUser.first_name + ' ' + randomUser.last_name}
  ></Placeholder> */}
          </Gradient>
          <Group
            header={
              <Header mode="secondary" indicator="25">
                Друзья
              </Header>
            }
          ></Group>
        </>{" "}
      </ModalPage>
  );
  return (
    <ModalPage
      id={id}
      settlingHeight={100}
      onClose={handleBack}
      header={
        <ModalPageHeader
          before={
            sizeX.compact && (
              <PanelHeaderClose
                className={sizeX.compact.className}
                onClick={handleBack}
              />
            )
          }
          after={<PanelHeaderSubmit onClick={handleBack} />}
        >
          Фильтры
        </ModalPageHeader>
      }
    >
      <Group>
        <FormItem htmlFor="colors" top="Выберите интересующие теги:">
          <ChipsSelect
            id="colors"
            value={undefined}
            onChange={() => {}}
            options={[
              { value: "тэг1", label: "тэг1" },
              { value: "тэг2", label: "тэг2" },
              { value: "тэг3", label: "тэг3" },
              { value: "тэг4", label: "тэг4" },
            ]}
            placeholder="Не выбраны"
            allowClearButton={true}
          />
        </FormItem>
      </Group>
    </ModalPage>
  );
};
