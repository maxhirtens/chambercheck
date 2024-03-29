import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import UserCircleIcon from "./UserCircleIcon";

type AvatarDropDownProps = {
  userName: string;
  userId: string;
  userImage: string;
};

export default function AvatarDropDownProps(props: AvatarDropDownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Box className="flex flex-col items-center">
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className="mx-2 bg-teal-500 text-sm text-white whitespace-nowrap p-2 shadow-inner rounded-xl hover:bg-teal-800 px-4"
          >
            <UserCircleIcon />
            <div className="ml-4 hidden md:block">{props.userName}</div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        className="mt-2"
      >
        <MenuItem onClick={handleClose}>
          <Link href="/users/[id]" as={`/users/${props.userId}`}>
            <div className="flex flex-row">
              <Image
                src={props.userImage!}
                alt=""
                width={25}
                height={25}
                className="rounded-full mr-3"
              />
              <div>Profile</div>
            </div>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
