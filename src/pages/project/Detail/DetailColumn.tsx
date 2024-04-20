/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectMembers } from "@/interfaces/project/projects.interface";
import { Avatar } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Translation } from "react-i18next";

export const EmployeeProjectsColumnsTable = (): ColumnsType<ProjectMembers> => [
  {
    title: <Translation>{(t) => t("LIST.AVATAR")}</Translation>,
    key: "avatar",
    width: "10%",
    render: (record) => {
      return (
        <>
          {record?.user?.isManager === false && (
            <Avatar
              style={{ alignItems: "center", justifyContent: "center" }}
              src={record?.user?.profile?.avatarUrl}
            />
          )}
        </>
      );
    },
  },
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_NAME")}</Translation>,
    key: "name",
    width: "20%",
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
    title: "Email",
    key: "email",
    width: "30%",
    render: (record) => {
      return (
        <>
          {record?.user?.isManager === false && (
            <p>{record?.user?.isManager === false && record.user.profile.email}</p>
          )}
        </>
      );
    },
  },
  {
    title: <Translation>{(t) => t("DETAIL_PROJECT.TABLE_ROLES")}</Translation>,
    key: "roles",
    width: "40%",
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
];
