import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { IUser } from "@/interfaces/user/users.interface";
import { DeleteOutlined, FileSearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Avatar, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const UsersColumnsTable = (
  handleAction: (key: string, item: IUser) => void,
): ColumnsType<IUser> => [
    {
      title: <Translation>{(t) => t("LIST.AVATAR")}</Translation>,
      dataIndex: "profile",
      render: (profile) => {
        return (
          <Space>
            {profile.avatarUrl ? (
              <Avatar size='large' src={profile.avatarUrl} />
            ) : (
              <Avatar style={{ backgroundColor: "#13C2C2" }} size='large'>
                {profile.fullName[0].toUpperCase()}
              </Avatar>
            )}
          </Space>
        );
      },
    },
    {
      title: <Translation>{(t) => t("LIST.NAME")}</Translation>,
      dataIndex: "profile",
      key: "profile",
      render: (profile) => {
        return profile.fullName;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: <Translation>{(t) => t("LIST.MANAGER")}</Translation>,
      dataIndex: "manager",
      width: "20%",
      render: (manager, record) => {
        return record.managerId === null ? (
          "..."
        ) : (
          <Space>
            <a href={`/users/${record.managerId}`}>
              <Avatar src={manager?.profile?.avatarUrl}>
                {manager?.profile?.fullName[0].toUpperCase()}
              </Avatar>
            </a>
            {manager?.profile?.fullName}
          </Space>
        );
      },
    },
    {
      title: <Translation>{(t) => t("LIST.STATUS")}</Translation>,
      key: "status",
      dataIndex: "profile",
      render: (profile) => (
        <Tag color={profile.status === "active" ? "green" : "red"}>
          <Translation>{(t) => t(`LIST.${profile.status.toUpperCase()}`)}</Translation>
        </Tag>
      ),
      filters: [
        {
          text: <Translation>{(t) => t("LIST.ACTIVE")}</Translation>,
          value: "active",
        },
        {
          text: <Translation>{(t) => t("LIST.NOTACTIVE")}</Translation>,
          value: "notactive",
        },
      ],
      onFilter: (value, record) => record.profile.status === value,
    },
    {
      title: <Translation>{(t) => t("LIST.ACTIONS")}</Translation>,
      dataIndex: "actions",
      key: "actions",
      fixed: "left",
      render: (_text, record) => (
        <Space direction='horizontal'>
          <ButtonAction
            variant='primary'
            handleAction={() => handleAction("down", record)}
            tooltip={i18n.t("ACTION.DOWN")}
          >
            <VerticalAlignBottomOutlined />
          </ButtonAction>
          <ButtonAction
            variant='success'
            handleAction={() => handleAction("detail", record)}
            tooltip={i18n.t("ACTION.DETAILS")}
          >
            <FileSearchOutlined />
          </ButtonAction>
          <ButtonAction
            variant='danger'
            handleAction={() => handleAction("delete", record)}
            tooltip={i18n.t("ACTION.DELETE")}
          >
            <DeleteOutlined />
          </ButtonAction>
        </Space>
      ),
    },
  ];
