import {
    BgColorsOutlined,
    DesktopOutlined, FileDoneOutlined,
    FontSizeOutlined,
    FundOutlined,
    FundViewOutlined, GoldOutlined,
    HddOutlined,
    HighlightOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import lazyLoad from "../lazyLoad";
import React, { lazy } from "react";
import { MenuRouteObject } from "../router";
import Page3 from "../../pages/Page3";
import Error403 from "../../pages/Error403";
import Error404 from "../../pages/Error404";
import ResultSuccess from "../../pages/ResultSuccess";
import ResultFail from "../../pages/ResultFail";

const system: MenuRouteObject = {
    path: "system",
    label: "menu.system management",
    icon: <SettingOutlined />,
    children: [
        {
            path: "params",
            label: "menu.system.param",
            icon: <UnorderedListOutlined />,
            element: lazyLoad(lazy(() => import("../../pages/Page3")))
        },
        {
            path: "dict",
            label: "menu.system.dict",
            icon: <FontSizeOutlined />,
            element: <Page3 />
        },
        {
            path: "log",
            label: "menu.system.log",
            icon: <InfoCircleOutlined />,
            children: [
                {
                    path: "action",
                    label: "menu.system.log_action",
                    icon: < HighlightOutlined />,
                    element: <Page3 />
                },
                {
                    path: "login",
                    label: "menu.system.log_login",
                    icon: <DesktopOutlined />,
                    element: <Page3 />
                },
            ] as MenuRouteObject[]
        },
        {
            label: "menu.system.monitor",
            path: "monitor",
            icon: <FundOutlined />,
            children: [
                {
                    path: "users",
                    label: "menu.system.monitor_users",
                    icon: <UserSwitchOutlined />,
                    element: <Page3 />
                },
                {
                    path: "server",
                    label: "menu.system.monitor_server",
                    icon: <HddOutlined />,
                    element: <Page3 />
                },
                {
                    path: "redis",
                    label: "menu.system.monitor_redis",
                    icon: <FundViewOutlined />,
                    element: <Page3 />
                },
                {
                    path: "caches",
                    label: "menu.system.monitor_caches",
                    icon: <GoldOutlined />,
                    element: <Page3 />
                },
            ] as MenuRouteObject[]
        },
        {
            label: "menu.system.dev",
            path: "dev",
            icon: <BgColorsOutlined />,
            children: [
                {
                    path: "success",
                    label: "menu.system.dev_success",
                    icon: <FileDoneOutlined />,
                    element: <ResultSuccess />
                },
                {
                    path: "fail",
                    label: "menu.system.dev_fail",
                    icon: <FileDoneOutlined />,
                    element: <ResultFail />
                },
                {
                    path: "403",
                    label: "menu.system.dev_error_403",
                    icon: <FileDoneOutlined />,
                    element: <Error403 />
                },
                {
                    path: "404",
                    label: "menu.system.dev_error_404",
                    icon: <FileDoneOutlined />,
                    element: <Error404 />
                },

            ] as MenuRouteObject[]
        }
    ] as MenuRouteObject[]
}
export default system