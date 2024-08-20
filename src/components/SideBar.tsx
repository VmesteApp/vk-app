import { FC, ReactNode } from "react";
import { Cell, Group } from "@vkontakte/vkui";

export type SideBarOption = {
  path: string;
  title: string;
  icon: ReactNode;
};

interface ISideBarProps {
  activePanel: string;
  options: SideBarOption[];
  onPress: (id: string) => void;
}

export const SideBar: FC<ISideBarProps> = ({
  activePanel,
  options,
  onPress,
}) => {
  return (
    <Group>
      {options.map(({ title, path, icon }) => (
        <Cell
          key={path}
          disabled={activePanel === path}
          style={
            activePanel === path
              ? {
                  backgroundColor: "var(--vkui--color_background_secondary)",
                  borderRadius: 8,
                }
              : undefined
          }
          data-story={path}
          onClick={() => onPress(path)}
          before={icon}
        >
          {title}
        </Cell>
      ))}
    </Group>
  );
};
