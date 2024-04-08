import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Tooltip, theme as antTheme } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { ReactComponent as MoonSvg } from "../../assets/header/ic_moon.svg";
import { ReactComponent as SunSvg } from "../../assets/header/ic_sun.svg";
import { ReactComponent as LanguageSvg } from "../../assets/header/language.svg";
import i18n from "../../config/i18n";
import { STORAGE_KEY } from "../../constants/enum";
import { LOCALES } from "../../constants/locale";
import { setGlobalState } from "../../redux/features/global/globalSlice";
import { RootState } from "../../redux/store";

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

// type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { theme } = useSelector((state: RootState) => state.global);
  //   const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //   const onActionClick = async (action: Action) => {
  //     let res: boolean;
  //     switch (action) {
  //       case 'userInfo':
  //         return;
  //       case 'userSetting':
  //         return;
  //       case 'logout':
  //         res = Boolean(dispatch(logout()));

  //         res && navigate('/sign-in');

  //         return;
  //     }
  //   };

  const onChangeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  const handleChangeLanguage = async ({ key }: { key: string }) => {
    localStorage.setItem(STORAGE_KEY.LOCALES, key);
    await i18n.changeLanguage(key);
  };

  return (
    <Header
      className='layout-page-header bg-2'
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      <div className='layout-page-header-main'>
        <div onClick={toggle}>
          <span id='sidebar-trigger'>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className='actions'>
          <Tooltip title={t("MENU.SWITCH_THEME")}>
            <span onClick={onChangeTheme} style={{ cursor: "pointer" }}>
              {theme === "dark" ? <SunSvg /> : <MoonSvg />}
            </span>
          </Tooltip>
          <Dropdown
            menu={{
              onClick: (value) => handleChangeLanguage(value),
              items: [
                {
                  key: LOCALES.VI,
                  label: "Vietnamese",
                },
                {
                  key: LOCALES.EN,
                  label: "English",
                },
              ],
            }}
          >
            <LanguageSvg />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
