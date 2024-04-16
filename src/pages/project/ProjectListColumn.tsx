import { ButtonAction } from "@/components/core/ButtonAction/ButtonAction";
import i18n from "@/config/i18n";
import { ColumnIProject } from "@/interfaces/project/projects.interface";
import { DeleteOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Avatar, Progress, Select, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format, parseISO } from "date-fns";
import { Translation } from "react-i18next";

export const ProjectsColumnsTable = (
  handleAction: (key: string, item: ColumnIProject) => void,
  handleChange: (value: string, item: ColumnIProject) => void,
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
    // sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    width: "15%",
    render: (text) => format(parseISO(text), "dd/MM/yyyy"),
  },

  {
    title: <Translation>{(t) => t("PROJECT.TARGETDATE")}</Translation>,
    dataIndex: "endDate",
    width: "15%",
    // sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    render: (text) => format(parseISO(text), "dd/MM/yyyy"),
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
      {
        text: "Pending",
        value: "Pending",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    filterSearch: true,
    width: "10%",
    render: (status, record) => (
      <>
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={() => handleChange("value", record)}
          options={[
            { value: "InProgress", label: "In Progress" },
            { value: "Completed", label: "Completed" },
            { value: "Pending", label: "Pending" },
          ]}
        />
      </>
    ),
  },
  {
    title: <Translation>{(t) => t("PROJECT.PROGRESS")}</Translation>,
    dataIndex: "progress",
    sorter: (a, b) => a.progress - b.progress,
    width: "20%",
    render: (_text, record) => {
      const currentDate: Date = new Date();
      const startDate: Date = new Date(record.startDate);
      const endDate: Date = new Date(record.endDate);
      const daysPassed: number = Math.max(
        0,
        Math.min(
          currentDate.getTime() - startDate.getTime(),
          endDate.getTime() - startDate.getTime(),
        ) /
          (1000 * 60 * 60 * 24),
      );
      const totalDays: number = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      const progressPercent: number = (daysPassed / totalDays) * 100;

      return <Progress percent={Math.round(progressPercent)} />;
    },
  },

  {
    title: <Translation>{(t) => t("PROJECT.MEMBERS")}</Translation>,
    dataIndex: "members",
    width: "10%",
    render: (_text, record) => (
      <Avatar.Group
        maxCount={3}
        size='large'
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        {record.projectMembers.map((item) => (
          <Avatar src={item.user.profile.avatarUrl} />
        ))}
      </Avatar.Group>
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
