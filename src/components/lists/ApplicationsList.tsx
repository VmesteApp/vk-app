import { FC } from "react";
import { ApplicationCard } from "../cards";
import { Button, ButtonGroup, Placeholder } from "@vkontakte/vkui";
import { useTranslation } from "react-i18next";

interface IApplicationsListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  handleFindPulses: () => void;
}

export const ApplicationsList: FC<IApplicationsListProps> = ({
  data,
  handleFindPulses,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {data.length > 0 ? (
        data.map((el) => <ApplicationCard key={el.id} {...el} />)
      ) : (
        <Placeholder.Container>
          <Placeholder.Text>
            {t("myPulses.placeholders.applications")}
          </Placeholder.Text>
          <Placeholder.Actions>
            <ButtonGroup mode="vertical" align="center">
              <Button size="m" onClick={handleFindPulses}>
                {t("myPulses.btns.findPulses")}
              </Button>
            </ButtonGroup>
          </Placeholder.Actions>
        </Placeholder.Container>
      )}
    </>
  );
};
