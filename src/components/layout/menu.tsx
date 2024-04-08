import type { FC } from "react";

import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuList } from "../../interfaces/layout/menu.interface";
import { setUserItem } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";
import { formatLocale } from "../../utils/locale";
import { CustomIcon } from "./customIcon";

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = (props) => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);

    if (device !== "DESKTOP") {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        {menu.icon ? <CustomIcon type={menu.icon!} /> : null}
        <span>{formatLocale(t, "MENU", menu.label)}</span>
      </span>
    );
  };

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className='layout-page-sider-menu text-2'
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map((child) => ({
                key: child.path,
                label: getTitle(child),
              })),
            }
          : {
              key: menu.path,
              label: getTitle(menu),
            };
      })}
    ></Menu>
  );
};

export default MenuComponent;
