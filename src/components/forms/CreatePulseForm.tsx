import {
  Button,
  ChipsSelect,
  FormItem,
  Group,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IOption {
  label: string;
  value: string;
}

export interface ICreatePulsePayload {
  category: string;
  name: string;
  description: string;
  short_description: string;
  tags: IOption[];
}

interface ICreatePulseFormProps {
  data: ICreatePulsePayload;
  handleChange: (payload: Partial<ICreatePulsePayload>) => void;
  handleSubmit: () => void;
  tagsAsset: IOption[];
}
export const CreatePulseForm: FC<ICreatePulseFormProps> = ({
  data,
  handleChange,
  handleSubmit,
  tagsAsset,
}) => {
  const { t } = useTranslation();

  return (
    <Group>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormItem htmlFor="colors" top={t(`createPulse.labels.tags`)}>
          <ChipsSelect
            id="colors"
            value={data.tags}
            multiple
            onChange={(value) => handleChange({ tags: value })}
            options={tagsAsset}
            allowClearButton={true}
          />
        </FormItem>
        <FormItem htmlFor="name" top={t(`createPulse.labels.name`)} required>
          <Input
            aria-labelledby="name-type"
            id="name"
            name="name"
            value={data.name}
            required
            onChange={(value) => handleChange({ name: value.target.value })}
          />
        </FormItem>
        <FormItem
          topNode={
            <FormItem.Top>
              <FormItem.TopLabel htmlFor="short_description">
                {t(`createPulse.labels.shortDescription`)}
              </FormItem.TopLabel>
              <FormItem.TopAside>
                {data.short_description.length}/50
              </FormItem.TopAside>
            </FormItem.Top>
          }
        >
          <Textarea
            id="short_description"
            name="short_description"
            maxLength={50}
            value={data.short_description}
            onChange={(value) =>
              handleChange({ short_description: value.target.value })
            }
            placeholder={t(`createPulse.placeholders.shortDescription`)}
          />
        </FormItem>
        <FormItem
          topNode={
            <FormItem.Top>
              <FormItem.TopLabel htmlFor="description">
                {t(`createPulse.labels.description`)}
              </FormItem.TopLabel>
              <FormItem.TopAside>
                {data.description.length}/2000
              </FormItem.TopAside>
            </FormItem.Top>
          }
        >
          <Textarea
            id="description"
            name="description"
            maxLength={2000}
            rows={15}
            value={data.description}
            onChange={(value) =>
              handleChange({ description: value.target.value })
            }
            placeholder={t(`createPulse.placeholders.description`)}
          />
        </FormItem>
        <FormItem top={t(`createPulse.labels.category`)} topId="category">
          <RadioGroup
            aria-labelledby="category"
            onSelect={(value) => console.log(value)}
          >
            {["event", "project"].map((category) => (
              <Radio
                key={category}
                name="category"
                value={category}
                checked={data.category === category}
                onChange={() => handleChange({ category })}
                description={t(`createPulse.placeholders.${category}`)}
              >
                {t(`createPulse.labels.${category}`)}
              </Radio>
            ))}
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="submit" size="l" stretched onClick={handleSubmit}>
            {t(`createPulse.buttons.publish`)}
          </Button>
        </FormItem>
      </form>
    </Group>
  );
};
