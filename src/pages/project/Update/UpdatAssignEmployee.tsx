/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectMembers } from "@/interfaces/project/projects.interface";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const UpdateAssignEmployee = (): ColumnsType<ProjectMembers> => [
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_NAME")}</Translation>,
    key: "name",
    width: "30%",
    render: (record) => {
      return (
        <>
          {record?.user?.isManager === false && (
            <p style={{ margin: "7px 0" }}>{record?.user?.profile?.fullName}</p>
          )}
        </>
      );
    },
  },
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_ROLES")}</Translation>,
    key: "roles",
    width: "60%",
    render: (record) => {
      return (
        <>
          {record?.user?.isManager === false && (
            <p>
              {record?.user?.isManager === false &&
                record?.roles?.map((role: any) => role?.position?.name).join(", ")}
            </p>
          )}
        </>
      );
    },
  },
  {
    title: <Translation>{(t) => t("CREATE_PROJECT.ACTION")}</Translation>,
    dataIndex: "operation",
    render: (record) =>
      record?.user?.profile?.fullName !== "" ? (
        <a style={{ color: "#16c2c2" }}>
          <Translation>{(t) => t("CREATE_PROJECT.DELETE")}</Translation>
        </a>
      ) : null,
  },
];
