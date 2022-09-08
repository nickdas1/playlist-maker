import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { PRIMARY_ERROR, PRIMARY_SUCCESS } from "./StyledComponents";

export default function InfoSnackbar() {
    const { notificationStatus, setNotificationStatus } =
        useContext(NotificationContext);

    const { isActive, severity, message } = notificationStatus;

    return (
        <Snackbar
            open={isActive}
            autoHideDuration={2000}
            onClose={() => setNotificationStatus({ isActive: false })}
        >
            <Alert
                severity={severity}
                sx={{
                    background:
                        severity === "success"
                            ? PRIMARY_SUCCESS
                            : PRIMARY_ERROR,
                    color: "white",
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
