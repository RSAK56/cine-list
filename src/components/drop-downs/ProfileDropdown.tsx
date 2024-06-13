import { IUser } from "@/common/interfaces/User.interface";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface IProfileDropdownProps {
  user: IUser | undefined;
  handleSignOut: () => void;
}

const ProfileDropdown = ({ user, handleSignOut }: IProfileDropdownProps) => {
  return (
    <div className="w-10 h-10 hover:cursor-pointer">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar isBordered color="danger" src="/png/auth-avatar.png" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.name}</p>
            <p className="font-semibold text-amber-400">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="analytics">WatchList</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
