import React, { useState } from "react";

const NotificationContext = React.createContext();

export function NotificationStore(props) {
    const [showNotification, setShowNotification] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    return (
        <NotificationContext.Provider
            value={{
                showNotification,
                setShowNotification,
                snackbarMessage,
                setSnackbarMessage,
                severity,
                setSeverity,
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;