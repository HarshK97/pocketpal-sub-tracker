import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) {
      anchorRef.current?.focus();
    }
  }, [open]);

  return (
    <div>
      <Avatar
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          width: 40,
          height: 40,
          cursor: "pointer",
          bgcolor: "transparent",
        }}
        className="rounded-full !bg-orange-200 hover:!bg-orange-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-black"
        >
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </svg>
      </Avatar>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal={false} // Important for visibility
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10], // space from avatar
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                  id="user-menu"
                >
                  <MenuItem onClick={handleClose}>
                    Subscription Tracker
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                  <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                  <MenuItem onClick={handleClose}>Sign Out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
