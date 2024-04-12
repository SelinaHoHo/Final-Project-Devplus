import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { IUser } from "@/interfaces/user/users.interface";
import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const UsersColumnsTable = (
  handleAction: (key: string, item: IUser) => void,
): ColumnsType<IUser> => [
  {
    title: "Id",
    dataIndex: "id",
    render: (_item, _record, index) => <>{index + 1}</>,
  },
  {
    title: <Translation>{(t) => t("LIST.AVATAR")}</Translation>,
    dataIndex: "avatarUrl",
    render: (_text, record) => {
      return (
        <Space>
          {record.avatarUrl ? (
            <Avatar size='large' src={record.avatarUrl} />
          ) : (
            <Avatar style={{ backgroundColor: "#13C2C2" }} size='large'>
              {record.fullName[0].toUpperCase()}
            </Avatar>
          )}
        </Space>
      );
    },
  },
  {
    title: <Translation>{(t) => t("LIST.NAME")}</Translation>,
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  // {
  //   title: <Translation>{(t) => t("LIST.POSITIONS")}</Translation>,
  //   dataIndex: "positions",
  //   key: "positions",
  //   render: (_, { positions }) => (
  //     <>
  //       {positions.map((positions) => {
  //         return <Tag key={positions}>{positions.toUpperCase()}</Tag>;
  //       })}
  //     </>
  //   ),
  // filters: [
  //   {
  //     text: "Font-end",
  //     value: "Font-end",
  //   },
  //   {
  //     text: "Back-end",
  //     value: "Back-end ",
  //   },
  //   {
  //     text: "FullStack",
  //     value: "FullStack",
  //   },
  // ],
  // onFilter: (value, record) => record.positions.includes(value as string),
  // // filterSearch: true,
  // width: "20%",
  // },
  {
    title: <Translation>{(t) => t("LIST.STATUS")}</Translation>,
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === "active" ? "green" : "red"}>
        <Translation>{(t) => t(`LIST.${status.toUpperCase()}`)}</Translation>
      </Tag>
    ),
    filters: [
      {
        text: <Translation>{(t) => t("LIST.ACTIVE")}</Translation>,
        value: "active",
      },
      {
        text: <Translation>{(t) => t("LIST.NOT_ACTIVE")}</Translation>,
        value: "notactive",
      },
    ],
    onFilter: (value, record) => record.status === value,
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
          variant='primary'
          handleAction={() => handleAction("sync", record)}
          tooltip={i18n.t("ACTION.DOWN")}
        >
          <VerticalAlignBottomOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
