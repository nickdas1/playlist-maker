import React, { useReducer } from "react";

const NotificationContext = React.createContext();

export function NotificationStore(props) {
    const [notificationStatus, setNotificationStatus] = useReducer(
        (notificationStatus, newNotificationStatus) => ({
            ...notificationStatus,
            ...newNotificationStatus,
        }),
        { isActive: false, message: "", severity: "error" }
    );

    return (
        <NotificationContext.Provider
            value={{
                notificationStatus,
                setNotificationStatus,
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
