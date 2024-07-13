import { FC, useState } from 'react';
import FileUpload from 'react-mui-fileuploader';
import { useShowErrorToast } from '../hooks';
import { ExtendedFileProps } from 'react-mui-fileuploader/dist/types/index.types';

type UploadFileType = {
  setFiles: (file?: ExtendedFileProps) => void;
  isMulti?: boolean;
};

const UploadFile: FC<UploadFileType> = ({setFiles, isMulti = true}) => {
  const [error, setError] = useState<string>();

  useShowErrorToast(error);
  const handleFilesChange = (file: ExtendedFileProps[]) => {
    // Do something...
    setFiles(file[0]);
  };

  return (
    <FileUpload 
      getBase64={false}
      // multiFile={isMulti}
      disabled={false}
      title="Загрузить файлы"
      header="[Drag to drop]"
      leftLabel="или"
      rightLabel="чтобы загрузить файлы"
      buttonLabel="Нажми сюда"
      buttonRemoveLabel="Удалить все"
      maxFileSize={10}
      maxUploadFiles={10}
      maxFilesContainerHeight={357}
      // acceptedType={'image/*'}
      errorSizeMessage={'fill it or remove it to use the default error message'}
      // allowedExtensions={['jpg', 'jpeg']}
      onFilesChange={handleFilesChange}
      onError={(error) => setError(error)}
      // imageSrc={'path/to/custom/image'}
      BannerProps={{ elevation: 0, variant: "outlined" }}
      showPlaceholderImage={true}
      PlaceholderGridProps={{ md: 4 }}
      LabelsGridProps={{ md: 8 }}
      onContextReady={context => {
        // access to component context here
      }}
      ContainerProps={{
        elevation: 0,
        variant: "outlined",
        sx: { p: 1 }
      }}
      PlaceholderImageDimension={{
        xs: { width: 128, height: 128 },
        sm: { width: 128, height: 128 },
        md: { width: 164, height: 164 },
        lg: { width: 256, height: 256 }
      }}
    />
  )
};

export default UploadFile;
