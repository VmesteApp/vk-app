import { Icon56UsersOutline } from "@vkontakte/icons";
import { Button, Placeholder } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLink } from "../../hook";

interface IErrorPlaceholderProps {
  message: string;
}

export const ErrorPlaceholder: FC<IErrorPlaceholderProps> = ({ message }) => {
  const { t } = useTranslation();
  const { openLink } = useLink();

  return (
    <Placeholder
      icon={<Icon56UsersOutline />}
      header={t("errorPlaceholder.oops")}
      action={
        message === "Unknown error" && (
          <Button
            onClick={() => openLink("https://vk.com/im?media=&sel=-227970967")}
            size="m"
          >
            {t("errorPlaceholder.goToTechSupport")}
          </Button>
        )
      }
    >
      {t(`errorPlaceholder.${message}`)}
    </Placeholder>
  );
};
