/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectMembers } from "@/interfaces/project/projects.interface";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const UpdateAssignEmployee = (
  handleActionDelete: (id: string) => void,
): ColumnsType<ProjectMembers> => [
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_NAME")}</Translation>,
    key: "name",
    width: "25%",
    render: (record) => {
      if (record?.user?.isManager === false) {
        return <p style={{ margin: "7px 0" }}>{record?.user?.profile?.fullName}</p>;
      } else {
        return <p style={{ display: "none" }}></p>;
      }
    },
  },
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_ROLES")}</Translation>,
    key: "roles",
    width: "60%",
    render: (record) => {
      if (record?.user?.isManager === false) {
        return (
          <p>
            {record?.user?.isManager === false &&
              record?.roles?.map((role: any) => role?.position?.name).join(", ")}
          </p>
        );
      }
    },
  },
  {
    title: <Translation>{(t) => t("CREATE_PROJECT.ACTION")}</Translation>,
    key: "operation",
    render: (record) => {
      if (record?.user?.isManager === false) {
        return (
          <DeleteOutlined
            onClick={() => handleActionDelete(record?.id as string)}
            style={{ color: "#16c2c2", fontSize: "20px" }}
          />
        );
      }
    },
  },
];
