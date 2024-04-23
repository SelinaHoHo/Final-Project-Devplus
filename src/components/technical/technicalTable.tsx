/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "@/config/i18n";
import ITechnical from "@/interfaces/technical/technicals.interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";
import { ButtonAction } from "../core/ButtonAction/ButtonAction";

export const technicalTable = (
  handleAction: (key: string, item: ITechnical) => void,
  loading: boolean,
): ColumnsType<ITechnical> => [
  {
    title: <Translation>{(t) => t("SKILL.TECH_NAME")}</Translation>,
    dataIndex: "name",
  },
  {
    title: <Translation>{(t) => t("SKILL.ACTIONS")}</Translation>,
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    render: (_text, record) => (
      <Space direction='horizontal'>
        <ButtonAction
          variant='primary'
          handleAction={() => handleAction("update", record)}
          tooltip={i18n.t("SKILL.EDIT")}
        >
          <EditOutlined />
        </ButtonAction>
        <ButtonAction
          variant='danger'
          loading={!loading}
          handleAction={() => handleAction("delete", record)}
          tooltip={i18n.t("SKILL.DELETE")}
        >
          <DeleteOutlined />
        </ButtonAction>
      </Space>
    ),
  },
];
