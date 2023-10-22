import Button from '@mui/material/Button';

const UploadFile = () => {
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden />
    </Button>
  );
};

export default UploadFile;
