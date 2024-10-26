import { FC } from "react";
import { ApplicationCard } from "../cards";
import { Button, ButtonGroup, Placeholder } from "@vkontakte/vkui";
import { useTranslation } from "react-i18next";
import { IApplication } from "../../types";

interface IApplicationsListProps {
  data: IApplication[];
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
        data.map((el, index) => (
          <ApplicationCard
            key={index}
            avatar={el.pulse.images[0]}
            name={el.pulse.name}
            status={el.status}
          />
        ))
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
