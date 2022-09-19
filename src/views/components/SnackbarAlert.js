import Snackbar from "@mui/material/Snackbar";
import {Alert, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@material-ui/core";

function SnackbarAlert({snackbarStatus, closeSnackbar, snackbarMessage}) {
    return (
        <Stack>
            <Snackbar
                autoHideDuration={snackbarMessage.importFile === true ? 20000 : 6512}
                open={snackbarStatus}
                onClose={closeSnackbar}
                transitionDuration={{enter: 500, exit: 500}}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <Alert severity={snackbarMessage.status} sx={{width: '100%', position: 'relative'}}>
                    <b>{snackbarMessage.message}</b> <br/>
                    {snackbarMessage.subMessage}
                    <a style={{ position: 'absolute', top: '7px', right: '10px'}} type="button"
                       className="close">
                        <IconButton size={'small'}>
                            <CloseIcon fontSize={'small'}
                                       onClick={() => closeSnackbar()}/>
                        </IconButton>
                    </a>
                </Alert>
            </Snackbar>
        </Stack>
    )
}
export default SnackbarAlert;