import { FC } from "react";
import { ApplicationCard } from "../cards";
import { Button, ButtonGroup, Placeholder } from "@vkontakte/vkui";

interface IApplicationsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  handleFindPulses: () => void;
}

export const ApplicationsList: FC<IApplicationsListProps> = ({
  data,
  handleFindPulses,
}) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((el) => <ApplicationCard key={el.id} {...el} />)
      ) : (
        <Placeholder.Container>
          <Placeholder.Text>Здесь собраны все твои заявки</Placeholder.Text>
          <Placeholder.Actions>
            <ButtonGroup mode="vertical" align="center">
              <Button size="m" onClick={handleFindPulses}>
                Искать Импульсы
              </Button>
            </ButtonGroup>
          </Placeholder.Actions>
        </Placeholder.Container>
      )}
    </>
  );
};
