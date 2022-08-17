import { Snackbar, Alert } from "@mui/material";
import { PRIMARY_ERROR, PRIMARY_SUCCESS } from "./StyledComponents";

export default function InfoSnackbar({
    message,
    showMessage,
    setShowMessage,
    severity = "error",
}) {
    return (
        <Snackbar
            open={showMessage}
            autoHideDuration={3000}
            onClose={() => setShowMessage(false)}
        >
            <Alert
                severity={severity}
                sx={{ background: severity === "success" ? PRIMARY_SUCCESS : PRIMARY_ERROR, color: "white" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
