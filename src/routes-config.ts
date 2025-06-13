import React, { lazy } from "react";

const Login = lazy(() => import("./pages/login/index"));
const ChatList = lazy(() => import("./pages/chat-list/index"));
const ChatWindow = lazy(() => import("./pages/chat-window/index"));

interface IRoutes {
  path: string;
  component: React.FC;
}

export const protectedRoutes: IRoutes[] | [] = [
  {
    path: "/",
    component: ChatList,
  },
  {
    path: "/chat-window",
    component: ChatWindow,
  },
];

export const unProtectedRoutes: IRoutes[] | [] = [];

export const authRoutes: IRoutes[] | [] = [
  {
    path: "/login",
    component: Login,
  },
];
