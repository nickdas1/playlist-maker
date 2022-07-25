import ReactDOM from "react-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

export default function PlaylistActionModal({
    header,
    content,
    actions,
    onDismiss,
    height,
}) {
    return ReactDOM.createPortal(
        <Box>
            <Modal open onClick={onDismiss}>
                <Box
                    sx={{ ...style, height }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        style={{ color: "white" }}
                    >
                        {header}
                    </Typography>
                    {content}
                    <Box>{actions}</Box>
                </Box>
            </Modal>
        </Box>,
        document.querySelector("#playlistActionModal")
    );
}
