import {
  ChipsSelect,
  FormItem,
  Group,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderSubmit,
  useAdaptivityConditionalRender,
  usePlatform,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IPulsesFilterModalProps {
  id: string;
}

export const PulsesFilterModal: FC<IPulsesFilterModalProps> = ({
  id,
}: IPulsesFilterModalProps) => {
  const { sizeX } = useAdaptivityConditionalRender();
  const { t } = useTranslation();
  const platform = usePlatform();

  const modalBack = () => {};

  return (
    <ModalPage
      id={id}
      onClose={modalBack}
      settlingHeight={100}
      height={platform === "vkcom" ? 250 : "250%"}
      hideCloseButton={platform === "ios"}
      header={
        <ModalPageHeader
          before={
            sizeX.compact && (
              <PanelHeaderClose
                className={sizeX.compact.className}
                onClick={modalBack}
              />
            )
          }
          after={<PanelHeaderSubmit onClick={modalBack} />}
        >
          {t("feed.filters")}
        </ModalPageHeader>
      }
    >
      <>
        <Group>
          <FormItem htmlFor="colors" top={`${t("feed.selectTags")}:`}>
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
              placeholder={t("feed.notSelected")}
              allowClearButton={true}
            />
          </FormItem>
        </Group>
      </>
    </ModalPage>
  );
};
