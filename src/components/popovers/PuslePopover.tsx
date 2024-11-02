import { FC } from "react";
import { Button, CellButton, Popover } from "@vkontakte/vkui";
import { Icon16MoreVertical, Icon24FlagStart } from "@vkontakte/icons";

interface IPulsePopover {
  onPressComplaint: () => void;
}

export const PulsePopover: FC<IPulsePopover> = ({ onPressComplaint }) => {
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
            Пожаловаться
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
