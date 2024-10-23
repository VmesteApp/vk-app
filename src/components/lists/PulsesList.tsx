import { FC } from "react";
import { MyPulseCard } from "../cards";
import { Button, ButtonGroup, Placeholder } from "@vkontakte/vkui";
import { IPulse } from "../../types";
import { useTranslation } from "react-i18next";

interface IPulsesListProps {
  data: IPulse[];
  handlePressPulse: (pulse: IPulse) => void;
  handleFoundPulses: () => void;
  handleCreatePulse: () => void;
}

export const PulsesList: FC<IPulsesListProps> = ({
  data,
  handlePressPulse,
  handleFoundPulses,
  handleCreatePulse,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {data.length > 0 ? (
        data.map((el) => (
          <MyPulseCard
            onPress={() => handlePressPulse(el)}
            key={el.id}
            avatar=""
            name={el.name}
            role={""}
          />
        ))
      ) : (
        <Placeholder.Container>
          <Placeholder.Text>
            {t("myPulses.placeholders.pulses")}
          </Placeholder.Text>
          <Placeholder.Actions>
            <ButtonGroup mode="vertical" align="center">
              <Button size="m" onClick={handleCreatePulse}>
                {t("myPulses.btns.foundPulse")}
              </Button>
              <Button size="m" mode="tertiary" onClick={handleFoundPulses}>
                {t("myPulses.btns.findPulses")}
              </Button>
            </ButtonGroup>
          </Placeholder.Actions>
        </Placeholder.Container>
      )}
    </>
  );
};
