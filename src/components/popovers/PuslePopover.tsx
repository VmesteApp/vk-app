import { FC } from "react";
import { Button, CellButton, Popover } from "@vkontakte/vkui";
import {
  Icon16MoreVertical,
  Icon24FlagStart,
  Icon24Share,
} from "@vkontakte/icons";
import { useTranslation } from "react-i18next";

interface IPulsePopover {
  onPressComplaint: () => void;
  onPressShare: () => void;
}

export const PulsePopover: FC<IPulsePopover> = ({
  onPressComplaint,
  onPressShare,
}) => {
  const { t } = useTranslation();

  return (
    <Popover
      noStyling
      trigger="click"
      id="menupopup"
      role="dialog"
      aria-labelledby="menubutton"
      content={({ onClose }) => (
        <div
          style={{
            backgroundColor: "var(--vkui--color_background_modal_inverse)",
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <CellButton
            role="menuitem"
            before={<Icon24FlagStart />}
            onClick={() => {
              onClose();
              onPressComplaint();
            }}
            mode="danger"
            size={16}
          >
            {t("complaints.complaint")}
          </CellButton>
          <CellButton
            role="menuitem"
            before={<Icon24Share />}
            onClick={() => {
              onClose();
              onPressShare();
            }}
            mode="primary"
            size={16}
          >
            {t("complaints.share")}
          </CellButton>
        </div>
      )}
    >
      <Button
        mode="tertiary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        after={
          <Icon16MoreVertical color="var(--vkui--color_background_modal_inverse)" />
        }
      />
    </Popover>
  );
};
