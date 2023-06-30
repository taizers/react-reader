import Button from '@mui/material/Button';

export const UploadFile = () => {
    return (
        <Button
            variant="contained"
            component="label"
        >
            Upload File
            <input
                type="file"
                hidden
            />
        </Button>
    )
}