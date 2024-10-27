import { Gallery, Group, MiniInfoCell, Spacing } from "@vkontakte/vkui";
import { FC } from "react";
import { IPulsePreview } from "../../types";
import { useTranslation } from "react-i18next";

interface IPreviewPulseCardProps {
  pulse: IPulsePreview;
}

export const PreviewPulseCard: FC<IPreviewPulseCardProps> = ({
  pulse,
}: IPreviewPulseCardProps) => {
  const { t } = useTranslation();

  return (
    <>
      {pulse.images.length > 0 && (
        <Group>
          <Gallery
            slideWidth="90%"
            align="center"
            bullets={pulse.images.length > 1 && "light"}
          >
            {pulse.images.map((img) => (
              <img
                key={img}
                src={img}
                style={{
                  display: "block",
                  objectFit: "scale-down",
                  maxHeight: 200,
                }}
              />
            ))}
          </Gallery>
        </Group>
      )}

      <Group>
        <MiniInfoCell mode="more" textWrap="full">
          {t(`pulseCard.category.${pulse.category}`).toUpperCase()}{" "}
          {pulse.tags.map((tag) => `#${tag.name}`).join(" ")}
        </MiniInfoCell>

        <Spacing size={12} />

        {pulse.description?.split("\n").map((sentence, id) => (
          <MiniInfoCell key={id} textWrap="full">
            {sentence}
          </MiniInfoCell>
        ))}
      </Group>
    </>
  );
};
