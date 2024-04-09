import type { FC } from "react";

import { Drawer, Layout, theme as antTheme } from "antd";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { setUserItem } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import { menuList } from "../../routes/menu";
import { getFirstPathCode } from "../../utils/getFirstPathCode";
import { getGlobalState } from "../../utils/getGloabal";
import Spin from "../core/Spin";
import TagsView from "../tagView";
import HeaderComponent from "./header";
import "./layout.scss";
import MenuComponent from "./menu";
import { ReactComponent as LogoSvg } from "../../assets/header/logo.svg";

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const { device, collapsed } = useSelector((state: RootState) => state.auth);
  const token = antTheme.useToken();

  const isMobile = device === "MOBILE";
  const dispatch = useDispatch();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  //   useEffect(() => {
  //     newUser && driverStart();
  //   }, [newUser]);

  return (
    <Layout className='layout-page'>
      {!isMobile ? (
        <Sider
          className='layout-page-sider'
          trigger={null}
          collapsible
          style={{ backgroundColor: token.token.colorBgContainer }}
          collapsedWidth={isMobile ? 0 : 80}
          collapsed={collapsed}
          breakpoint='md'
        >
          <div className='collapsed' onClick={toggle}>
            <svg
              style={{
                transition: "transform 0.3s",
                transform: collapsed ? "rotate(-90deg)" : "rotate(90deg)",
              }}
              width='1em'
              height='1em'
              viewBox='0 0 12 12'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z'></path>
            </svg>
          </div>
          <div className='demo-logo-vertical'>
            <span className='anticon' style={{ fontSize: "100px" }}>
              <LogoSvg />
            </span>
          </div>
          <MenuComponent
            menuList={menuList}
            openKey={openKey}
            onChangeOpenKey={(k) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Sider>
      ) : (
        <Drawer
          width='200'
          placement='left'
          bodyStyle={{ padding: 0, height: "100%" }}
          closable={false}
          onClose={toggle}
          open={!collapsed}
        >
          <MenuComponent
            menuList={menuList}
            openKey={openKey}
            onChangeOpenKey={(k) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k) => setSelectedKey(k)}
          />
        </Drawer>
      )}
      <Layout>
        <HeaderComponent collapsed={collapsed} toggle={toggle} />

        <Content className='layout-page-content'>
          <TagsView />
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
