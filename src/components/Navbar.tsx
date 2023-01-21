// import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Image } from "antd";
import Link from "next/link";
import React from "react";

import { DownOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";

interface AuthLinksProps {
  profilePicture?: string;
}

const gameInfoMenuItems: MenuProps["items"] = [
  {
    key: 1,
    label: <Link href="/game-info">Classes</Link>,
  },
  {
    key: 2,
    label: <Link href="/game-info">Spells</Link>,
  },
  {
    key: 3,
    label: <Link href="/game-info">Races</Link>,
  },
  {
    key: 4,
    label: <Link href="/game-info">Monsters</Link>,
  },
  {
    key: 5,
    label: <Link href="/game-info">Feats</Link>,
  },
  {
    key: 6,
    label: <Link href="/game-info">Backgrounds</Link>,
  },
  {
    key: 7,
    label: <Link href="/game-info">Equipment</Link>,
  },
  {
    key: 8,
    label: <Link href="/game-info">Vehicles</Link>,
  },
  {
    key: 9,
    label: <Link href="/game-info">Magic Items</Link>,
  },
];

const AuthenticatedLinks: React.FC<AuthLinksProps> = ({ profilePicture }) => {
  const accountMenuItems: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            signOut().catch(console.log);
          }}
        >
          Sign Out
        </a>
      ),
    },
  ];

  return (
    <>
      <Dropdown placement="bottom" menu={{ items: gameInfoMenuItems }}>
        <Link href="/game-info">
          Game Info <DownOutlined className="relative -top-1 scale-75" />
        </Link>
      </Dropdown>
      <Link className="custom-link" href="/characters">
        Characters
      </Link>
      <Link className="custom-link" href="/campaigns">
        Campaigns
      </Link>
      <Dropdown
        placement="bottomRight"
        arrow
        menu={{ items: accountMenuItems }}
      >
        <div className="relative">
          <span className="avatar-dropdown-fix">
            {(
              <Avatar
                size="large"
                className="cursor-pointer"
                src={
                  <Image
                    src={profilePicture}
                    alt="Profile picture"
                    referrerPolicy="no-referrer"
                    preview={false}
                  />
                }
              />
            ) ?? null}
          </span>
        </div>
      </Dropdown>
      {/* <Link
        href=""
        onClick={(e) => {
          e.preventDefault();
          signOut().catch(console.log);
        }}
      >
        Sign Out
      </Link> */}
    </>
  );
};

const UnauthenticatedLinks: React.FC = () => {
  return (
    <>
      <Dropdown placement="bottom" menu={{ items: gameInfoMenuItems }}>
        <Link href="/game-info">
          Game Info <DownOutlined className="relative -top-1 scale-75" />
        </Link>
      </Dropdown>
      <Link
        href=""
        onClick={(e) => {
          e.preventDefault();
          signIn("google").catch(console.log);
        }}
        className="custom-link"
      >
        Sign In
      </Link>
    </>
  );
};

const Navbar: React.FC = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  // Game Info, Campaigns, Characters
  // Game Info:

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-20 min-w-full max-w-full select-none flex-row justify-center pl-10 pr-10">
      <div className="flex h-full w-full max-w-6xl flex-row items-center justify-between">
        <Link href="/" className="custom-link scale-100 text-4xl font-bold">
          D&amp;D Helper
        </Link>
        <div className="flex flex-row items-center gap-5">
          {sessionStatus === "authenticated" ? (
            <AuthenticatedLinks
              profilePicture={sessionData.user?.image as string}
            />
          ) : (
            <UnauthenticatedLinks />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
