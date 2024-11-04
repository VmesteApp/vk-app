import { Icon24Camera } from "@vkontakte/icons";
import {
  Button,
  ChipsSelect,
  FormItem,
  Group,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  File as FilePicker,
  List,
  Cell,
  Image,
  Header,
  Link,
  MiniInfoCell,
} from "@vkontakte/vkui";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLink } from "../../hook";

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
  images: File[];
}

interface ICreatePulseFormProps {
  data: ICreatePulsePayload;
  handleChange: (payload: Partial<ICreatePulsePayload>) => void;
  handleSubmit: () => void;
  tagsAsset: IOption[];
  disabled: boolean;
}
export const CreatePulseForm: FC<ICreatePulseFormProps> = ({
  data,
  handleChange,
  handleSubmit,
  tagsAsset,
  disabled,
}) => {
  const { t } = useTranslation();
  const { openLink } = useLink();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = event.target.files;
    if (!filelist) {
      return handleChange({
        ...data,
        images: [],
      });
    }

    const images = [];
    for (let i = 0; i < filelist.length; i++) {
      images.push(filelist[i]);
    }

    handleChange({
      ...data,
      images,
    });
  };

  const handleImageDelete = (id: number) => {
    handleChange({
      ...data,
      images: data.images.filter((_, index) => index !== id),
    });
  };

  const handleDragFinish = ({ from, to }: { from: number; to: number }) => {
    const _list = [...data.images];
    _list.splice(from, 1);
    _list.splice(to, 0, data.images[from]);
    handleChange({ ...data, images: _list });
  };

  const previewImages = useMemo(
    () => data.images.map((image) => URL.createObjectURL(image)),
    [data.images]
  );

  return (
    <Group>
      <form onSubmit={(e) => e.preventDefault()}>
        <FormItem
          htmlFor="colors"
          top={t(`createPulse.labels.tags`)}
          bottom={t(`createPulse.placeholders.tags`)}
          required
        >
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
              <FormItem.TopLabel required htmlFor="short_description">
                {t(`createPulse.labels.shortDescription`)}
              </FormItem.TopLabel>
              <FormItem.TopAside>
                {data.short_description.length}/150
              </FormItem.TopAside>
            </FormItem.Top>
          }
          required
        >
          <Textarea
            id="short_description"
            name="short_description"
            maxLength={150}
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
          required
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
            required
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

        <FormItem
          top={t("createPulse.labels.images")}
          required
          bottom={t("createPulse.placeholders.images")}
        >
          <FilePicker
            onChange={handleFileChange}
            before={<Icon24Camera role="presentation" />}
            size="m"
            accept="image/png, image/jpeg"
            multiple
          >
            {t("createPulse.buttons.openGallery")}
          </FilePicker>
        </FormItem>
        {data.images.length > 0 && (
          <Group
            header={<Header subtitle={t("createPulse.placeholders.avatar")} />}
          >
            <List>
              {data.images.map((item, index) => (
                <Cell
                  key={index}
                  before={<Image src={previewImages[index]} alt="" />}
                  mode="removable"
                  onRemove={() => handleImageDelete(index)}
                  draggable
                  onDragFinish={handleDragFinish}
                >
                  {item.name}
                </Cell>
              ))}
            </List>
          </Group>
        )}

        <FormItem
          bottom={
            <MiniInfoCell style={{ paddingLeft: 0 }} textWrap="full">
              {t("createPulse.publishButtonDescription")}{" "}
              <Link
                onClick={() =>
                  openLink(
                    "https://docs.google.com/document/d/1JIu0TRwWH6336eUJyKLO_42CXq4K9G0HyQ4T_OzNkLs/edit?usp=sharing"
                  )
                }
              >
                {t("createPulse.userAgreement")}
              </Link>
            </MiniInfoCell>
          }
        >
          <Button
            disabled={disabled}
            type="submit"
            size="l"
            stretched
            onClick={handleSubmit}
          >
            {t(`createPulse.buttons.publish`)}
          </Button>
        </FormItem>
      </form>
    </Group>
  );
};
