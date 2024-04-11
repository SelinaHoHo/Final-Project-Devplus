import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { IProject } from "@/interfaces/project/projects.interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Progress, Space, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const ProjectsColumnsTable = (
  handleAction: (key: string, item: IProject) => void,
  loading: boolean,
): ColumnsType<IProject> => [
  {
    title: <Translation>{(t) => t("Id")}</Translation>,
    dataIndex: "id",
    width: "4%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROJECTNAME")}</Translation>,
    dataIndex: "project_name",
    width: "15%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.STARTDATE")}</Translation>,
    dataIndex: "start_date",
    width: "13%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.TARGETDATE")}</Translation>,
    dataIndex: "target_completion_date",
    width: "13%",
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROJECTSTATUS")}</Translation>,
    key: "project_status",
    dataIndex: "project_status",
    filters: [
      {
        text: "In Process",
        value: "In Process",
      },
      {
        text: "Testing",
        value: "Testing",
      },
      {
        text: "Done",
        value: "Done",
      },
    ],
    onFilter: (value, record) =>
      record.project_status.some((status) => status.startsWith(value as string)),
    filterSearch: true,
    width: "12%",
    render: (_, { project_status }) => (
      <>
        {project_status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "Done") {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROGRESS")}</Translation>,
    dataIndex: "progress",
    sorter: (a, b) => a.progress - b.progress,
    width: "20%",
    render: (_text, record) => <Progress percent={record.progress} />,
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
