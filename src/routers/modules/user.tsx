import {
    DesktopOutlined,
    InsertRowRightOutlined, MenuOutlined,
    PieChartOutlined, TagsOutlined,
    TeamOutlined, ThunderboltOutlined,
    UserOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import lazyLoad from "../lazyLoad";
import React, { lazy } from "react";
import { MenuRouteObject } from "../router";
import Page2 from "../../pages/Page3";
import Page3 from "../../pages/Page3";

const system: MenuRouteObject = {
    path: "user",
    label: "menu.user management",
    icon: <UserOutlined />,
    children: [
        {
            path: "list",
            label: "menu.user.list_user",
            icon: <TeamOutlined />,
            element: lazyLoad(lazy(() => import("../../pages/user/UserList")))
        },
        {
            path: "dept",
            label: "menu.user.department",
            icon: <InsertRowRightOutlined />,
            element: <Page2 />
        },
        {
            path: "position",
            label: "menu.user.position",
            icon: <UserSwitchOutlined />,
            element: <Page3 />
        },
        {
            path: "role",
            label: "menu.user.role",
            icon: <TagsOutlined />,
            element: <Page3 />
        },
        {
            path: "permission",
            label: "menu.user.permission",
            icon: <ThunderboltOutlined />,
            element: <Page3 />
        },
        {
            path: "menu",
            label: "menu.user.menu",
            icon: <MenuOutlined />,
            element: <Page3 />
        },
    ] as MenuRouteObject[]
}
export default system