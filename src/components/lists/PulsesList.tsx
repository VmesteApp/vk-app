import { FC } from "react";
import { MyPulseCard } from "../cards";
import { Button, ButtonGroup, Placeholder } from "@vkontakte/vkui";

interface IPulsesListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  handleFindPulses: () => void;
  handleCreatePulse: () => void;
}

export const PulsesList: FC<IPulsesListProps> = ({
  data,
  handleFindPulses,
  handleCreatePulse,
}) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((el) => <MyPulseCard key={el.id} {...el} />)
      ) : (
        <Placeholder.Container>
          <Placeholder.Text>
            Здесь ты найдешь все импульсы, которые ты создал или в которых
            участвуешь.
          </Placeholder.Text>
          <Placeholder.Actions>
            <ButtonGroup mode="vertical" align="center">
              <Button size="m" onClick={handleCreatePulse}>
                Основать Импульс
              </Button>
              <Button size="m" mode="tertiary" onClick={handleFindPulses}>
                Искать Импульсы
              </Button>
            </ButtonGroup>
          </Placeholder.Actions>
        </Placeholder.Container>
      )}
    </>
  );
};
