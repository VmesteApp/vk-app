import {
  Avatar,
  Button,
  ButtonGroup,
  MiniInfoCell,
  RichCell,
} from "@vkontakte/vkui";
import { FC } from "react";
import { IApplicationWithCandidate } from "../../types";
import { useUserInfo } from "../../hook/useUserInfo";
import { useLink } from "../../hook";
import { useTranslation } from "react-i18next";

interface IApplicationCardWithActionsProps {
  application: IApplicationWithCandidate;
  onApproved: () => void;
  onRejected: () => void;
}

export const ApplicationCardWithActions: FC<
  IApplicationCardWithActionsProps
> = ({ application, onApproved, onRejected }) => {
  const { t } = useTranslation();
  const { userInfo, loading } = useUserInfo(application.candidate_id);
  const { openLink } = useLink();

  if (!userInfo || loading) {
    return null;
  }

  return (
    <RichCell
      onClick={() => openLink(`https://vk.com/id${userInfo.id}`)}
      before={<Avatar size={72} src={userInfo.photo_200} />}
      caption={
        <MiniInfoCell textWrap="full" style={{ paddingLeft: 0 }}>
          {application.message}
        </MiniInfoCell>
      }
      actions={
        <ButtonGroup
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          mode="horizontal"
          gap="s"
          stretched
        >
          <Button
            onClick={onApproved}
            mode="primary"
            size="s"
            appearance="positive"
          >
            {t("adminPulseApplications.approve")}
          </Button>
          <Button
            onClick={onRejected}
            mode="primary"
            appearance="negative"
            size="s"
          >
            {t("adminPulseApplications.reject")}
          </Button>
        </ButtonGroup>
      }
    >
      {userInfo.first_name} {userInfo.last_name}
    </RichCell>
  );
};
