import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { IUser } from "@/interfaces/user/users.interface";
import { Space } from "antd";

export const UsersColumnsTable = (
  handleAction: (key: string, item: IUser) => void,
  loading: boolean,
): ColumnsType<IUser> => [
  {
    title: <Translation>{(t) => t("Id")}</Translation>,
    dataIndex: "id",
  },
  {
    title: <Translation>{(t) => t("Name Project")}</Translation>,
    dataIndex: "name",
  },
  {
    title: <Translation>{(t) => t("Start Date")}</Translation>,
    dataIndex: "start date",
  },
  {
    title: <Translation>{(t) => t("Email")}</Translation>,
    dataIndex: "email",
  },
  {
    title: <Translation>{(t) => t("Actions")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    render: (_text, record) => (
      <Space direction='horizontal'>
        <ButtonAction
          variant='success'
          handleAction={() => handleAction("detail", record)}
          tooltip={i18n.t("ACTION.DETAILS")}
        >
          <SearchOutlined />
        </ButtonAction>
        <ButtonAction
          variant='danger'
          loading={!loading}
          handleAction={() => handleAction("sync", record)}
          tooltip={i18n.t("ACTION.SYNC")}
        >
          <SyncOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
