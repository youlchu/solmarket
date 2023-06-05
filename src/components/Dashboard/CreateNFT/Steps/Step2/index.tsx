import { Box, Heading } from '@chakra-ui/layout';
import { Button, RadioGroup, Stack, Text, useRadioGroup } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { GiArtificialIntelligence, GiFiles, GiThorHammer } from 'react-icons/gi';
import * as yup from 'yup';
import { ErrorMessage, FormValues } from '../..';
import { RadioCard } from '../../RadioCard';
import { SelectFromAI } from './SelectFromAI';
import { ImageUploader } from 'components/Dashboard/ImageUploader';

export const Step2Schema = yup.object().shape({
  imageType: yup.string().required('This value is required.'),
  image: yup.string().required('This value is required.'),
});

const options = [
  { label: 'Bilgisayardan seç', value: 'select-from-computer', icon: GiFiles },
  {
    label: 'Yapay Zeka ile seç',
    value: 'select-from-ai',
    icon: GiArtificialIntelligence,
  },
  // { label: 'Kendin Oluştur', value: 'select-from-custom', icon: GiThorHammer },
];

export const Step2 = () => {
  const { control } = useFormContext<FormValues>();

  const {
    field,
    formState: { errors },
  } = useController({
    name: 'imageType',
    control,
  });
  const {
    field: image,
    formState: { errors: imageErrors },
  } = useController({
    name: 'image',
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'imageType',
    defaultValue: field.value,
    onChange: field.onChange,
  });

  const group = getRootProps();

  return (
    <Box
      sx={{
        mb: 8,
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
      }}
    >
      {!field.value && (
        <>
          <Heading size="lg" sx={{ mt: 8 }}>
            NFT&apos;ni nasıl oluşturmak istersin?
          </Heading>
          <Text sx={{ mt: 4 }}>
            NFT&apos;n b ni oluşturmak için aşağıdaki seçeneklerden birini seç.
          </Text>
          <RadioGroup mb={4} name="Step2" sx={{ mt: 8 }}>
            <Stack {...group} spacing={4} direction="row">
              {options.map(({ value, label, icon }, i) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard icon={icon} key={value} {...radio}>
                    {label}
                  </RadioCard>
                );
              })}
            </Stack>
          </RadioGroup>
          {errors.imageType && <ErrorMessage message={errors.imageType.message || ''} />}
        </>
      )}
      {field.value && (
        <Box marginTop="30px">
          <Button onClick={() => field.onChange('')}>Geri Dön</Button>
          <Box marginTop="20px">
            {field.value === 'select-from-computer' && (
              <ImageUploader
                onChange={(value) => {
                  image.onChange(value);
                }}
              />
            )}
            {field.value === 'select-from-ai' && (
              <SelectFromAI
                onChange={(value) => {
                  image.onChange(value);
                }}
              />
            )}
            {field.value === 'select-from-custom' && <>Select from custom</>}
          </Box>
        </Box>
      )}
    </Box>
  );
};
