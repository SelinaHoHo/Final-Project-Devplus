import type { FC } from "react";

import { Tabs } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { addTag, removeTag, setActiveTag } from "../../redux/features/tagView/tagViewSlice";
import { RootState } from "../../redux/store";
import { formatLocale } from "../../utils/locale";
import TagsViewAction from "./tagViewAction";

const TagsView: FC = () => {
  const { tags, activeTagId, name, namePrj } = useSelector((state: RootState) => state.tagsView);
  const { menuList } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find((tag) => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  };

  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find((item) => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.path));
      }
    },
    [dispatch, location.pathname, tags],
  );

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find((m) => m.path === location.pathname);
      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: menu.code !== "dashboard",
          }),
        );
      }
    }
  }, [dispatch, location.pathname, menuList]);

  // useEffect(() => {
  //   if (location.pathname.startsWith("/employees/detail/")) {
  //     setDetailNameEmployee(name);
  //   } else if (location.pathname.startsWith("/employees/edit")) {
  //     setDetailNameEmployee(name);
  //   } else {
  //     setDetailNameEmployee(undefined);
  //   }

  //   if (location.pathname.startsWith("/projects/detail/")) {
  //     setDetailNameProject(namePrj);
  //   } else if (location.pathname.startsWith("/projects/edit/")) {
  //     setDetailNameProject(namePrj);
  //   } else {
  //     setDetailNameProject(undefined);
  //   }
  // }, [location.pathname, name, namePrj]);

  return (
    <div id='pageTabs' style={{ padding: "6px" }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type='editable-card'
        hideAdd
        onEdit={(targetKey, action) => action === "remove" && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
        items={tags.map((tag) => {
          let label = formatLocale(t, "MENU", tag.label);

          if (tag.path === "/employees/list" && location.pathname.startsWith("/employees/detail")) {
            label = name;
          } else if (
            tag.path === "/projects/list" &&
            location.pathname.startsWith("/projects/detail")
          ) {
            label = namePrj;
          } else if (
            tag.path === "/employees/list" &&
            location.pathname.startsWith("/employees/edit")
          ) {
            label = name;
          } else if (
            tag.path === "/projects/list" &&
            location.pathname.startsWith("/projects/edit")
          ) {
            label = namePrj;
          }

          return {
            key: tag.path,
            closable: tag.closable,
            label,
          };
        })}
      />
    </div>
  );
};

export default TagsView;
