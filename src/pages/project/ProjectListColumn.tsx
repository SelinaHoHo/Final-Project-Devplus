import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { ColumnIProject } from "@/interfaces/project/projects.interface";
import { DeleteOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Avatar, Progress, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const ProjectsColumnsTable = (
  handleAction: (key: string, item: ColumnIProject) => void,
  loading: boolean,
): ColumnsType<ColumnIProject> => [
  {
    title: <Translation>{(t) => t("Id")}</Translation>,
    dataIndex: "id",
    width: "5%",
    render: (_item, _record, index) => <>{index + 1}</>,
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROJECTNAME")}</Translation>,
    dataIndex: "name",
    width: "15%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.STARTDATE")}</Translation>,
    dataIndex: "startDate",
    width: "15%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.TARGETDATE")}</Translation>,
    dataIndex: "endDate",
    width: "15%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROJECTSTATUS")}</Translation>,
    dataIndex: "status",
    filters: [
      {
        text: "In Progress",
        value: "InProgress",
      },
      {
        text: "Completed",
        value: "Completed",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    filterSearch: true,
    width: "10%",
    render: (status) => <Tag color={status === "Completed" ? "green" : "geekblue"}>{status}</Tag>,
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROGRESS")}</Translation>,
    dataIndex: "progress",
    sorter: (a, b) => a.progress - b.progress,
    width: "20%",
    render: (_text, record) => <Progress percent={record.progress} />,
  },
  {
    title: <Translation>{(t) => t("PROJECT.MEMBERS")}</Translation>,
    dataIndex: "members",
    width: "10%",
    render: (_text) => (
      <>
        <Avatar.Group
          maxCount={3}
          size='large'
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
          }}
        >
          <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=3' />
          <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=3' />
          <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=3' />
          <Avatar src='https://api.dicebear.com/7.x/miniavs/svg?seed=3' />
        </Avatar.Group>
      </>
    ),
  },
  {
    title: <Translation>{(t) => t("PROJECT.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "left",
    render: (_text, record) => (
      <Space direction='horizontal'>
        <ButtonAction
          variant='success'
          handleAction={() => handleAction("edit", record)}
          tooltip={i18n.t("ACTION.EDIT")}
        >
          <EditOutlined />
        </ButtonAction>
        <ButtonAction
          variant='success'
          handleAction={() => handleAction("detail", record)}
          tooltip={i18n.t("ACTION.DETAIL")}
        >
          <FileSearchOutlined />
        </ButtonAction>
        <ButtonAction
          variant='danger'
          loading={!loading}
          handleAction={() => handleAction("delete", record)}
          tooltip={i18n.t("ACTION.DELETE")}
        >
          <DeleteOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
