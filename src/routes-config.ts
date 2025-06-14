import React, { lazy } from "react";

const LoginPage = lazy(() => import("./pages/login/index"));
const ChatListPage = lazy(() => import("./pages/chat-list/index"));
const ChatWindowPage = lazy(() => import("./pages/chat-window/index"));

interface IRoutes {
  path: string;
  component: React.FC;
}

export const protectedRoutes: IRoutes[] | [] = [
  {
    path: "/",
    component: ChatListPage,
  },
  {
    path: "/chat/:id",
    component: ChatWindowPage,
  },
];

export const unProtectedRoutes: IRoutes[] | [] = [];

export const authRoutes: IRoutes[] | [] = [
  {
    path: "/login",
    component: LoginPage,
  },
];
