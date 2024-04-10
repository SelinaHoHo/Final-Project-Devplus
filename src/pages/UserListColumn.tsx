import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";
import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { IUser } from "@/interfaces/user/users.interface";
import { Avatar, Space, Tag } from "antd";

export const UsersColumnsTable = (
  handleAction: (key: string, item: IUser) => void,
): ColumnsType<IUser> => [
  {
    title: <Translation>{(t) => t("Id")}</Translation>,
    dataIndex: "id",
  },
  {
    title: <Translation>{(t) => t("LIST.NAME")}</Translation>,
    dataIndex: "name",
    key: "name",
    render: (text, record) => {
      return (
        <Space>
          {record.avatarUrl ? (
            <Avatar size='large' src={record.avatarUrl} />
          ) : (
            <Avatar style={{ backgroundColor: "#13C2C2" }} size='large'>
              {record.name[0].toUpperCase()}
            </Avatar>
          )}
          <a>{text}</a>
        </Space>
      );
    },
  },
  {
    title: <Translation>{(t) => t("Email")}</Translation>,
    dataIndex: "email",
  },
  {
    title: <Translation>{(t) => t("LIST.POSITIONS")}</Translation>,
    dataIndex: "positions",
    key: "address",
    render: (_, { positions }) => (
      <>
        {positions.map((positions) => {
          return <Tag key={positions}>{positions.toUpperCase()}</Tag>;
        })}
      </>
    ),
    filters: [
      {
        text: "Font-end",
        value: "Font-end",
      },
      {
        text: "Back-end",
        value: "Back-end ",
      },
      {
        text: "FullStack",
        value: "FullStack",
      },
    ],
    onFilter: (value, record) => record.positions.includes(value as string),
    filterSearch: true,
    width: "20%",
  },
  {
    title: <Translation>{(t) => t("LIST.STATUS")}</Translation>,
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status ? "green" : "red"}>{status ? "Active" : "Inactive"}</Tag>
    ),
  },
  {
    title: <Translation>{(t) => t("LIST.ACTIONS")}</Translation>,
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
          handleAction={() => handleAction("sync", record)}
          tooltip={i18n.t("ACTION.SYNC")}
        >
          <SyncOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
