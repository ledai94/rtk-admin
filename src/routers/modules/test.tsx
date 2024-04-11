import { HeartOutlined, HomeOutlined } from "@ant-design/icons";
import lazyLoad from "../lazyLoad";
import React, { lazy } from "react";
import { MenuRouteObject } from "../router";

const test: MenuRouteObject = {
    path: "test",
    label: "menu.favorite management",
    icon: <HeartOutlined />,
    element: lazyLoad(lazy(() => import("../../pages/Page3")))
}

export default test