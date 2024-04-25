import { Table } from "@/components/core/Table/Table";
import i18n from "@/config/i18n";
import { useDeleteProject, useGetProjects, useUpdateStatus } from "@/hooks/useProject";
import { ColumnIProject } from "@/interfaces/project/projects.interface";
import { RootState } from "@/redux/store";
import { Button, Col, Input, Modal, Row } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { Translation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./ListProject.scss";
import { ProjectsColumnsTable } from "./ProjectListColumn";

const ListProject = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const [table, setTable] = useState({
    page: 1,
    take: 10,
  });

  const [filterName, setFilterName] = useState("");

  const paginatorSearch = {
    name: filterName,
    page: table.page,
    take: table.take,
  };

  const { data, isLoading, refetch } = useGetProjects(paginatorSearch);
  const navigate = useNavigate();
  const { mutate: onDeleteProject } = useDeleteProject();
  const handleAction = (key: string, _item: ColumnIProject) => {
    switch (key) {
      case "edit":
        navigate(`/projects/edit/${_item.id}`);
        break;
      case "detail":
        navigate(`/projects/${_item.id}`);
        break;
      case "delete":
        //  eslint-disable-next-line no-case-declarations
        const projectName = _item.name || "";
        Modal.confirm({
          title: t("DELETE_USER.TITLE_DELETE", { name: projectName }),
          content: t("DELETE_USER.CONFIRM_DELETE", { name: projectName }),
          okText: t("DELETE_USER.OK"),
          cancelText: t("DELETE_USER.CANCEL"),
          onOk: () => onDeleteProject(_item.id),
        });
        break;
      default:
    }
  };

  const { mutate: handleUpdateStatus } = useUpdateStatus();
  const handleChange = (value: string, item: ColumnIProject) => {
    handleUpdateStatus({ id: item.id, status: value });
  };

  const onSearch = () => {
    setTable({
      page: 1,
      take: 10,
    });
    refetch();
  };

  const handleChangeSearch = async (value: string) => {
    if (value === "") {
      await setFilterName(value);
      refetch();
    } else {
      setFilterName(value);
    }
  };

  return (
    <div className='page-list-project'>
      {theme === "dark" ? (
        <div className='form-create-dark'>
          <div className='test'>
            <Row gutter={[8, 4]} style={{ marginBottom: "1.5rem" }}>
              <Col span={4}>
                <Input
                  placeholder={i18n.t("LISTPROJECT.PROJECT_NAME")}
                  size='middle'
                  allowClear
                  onChange={(value) => handleChangeSearch(value.target.value)}
                />
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={onSearch} size='middle'>
                  <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
                </Button>
              </Col>
              <Col span={14} style={{ textAlign: "end" }}>
                <Button type='primary' size='middle'>
                  <Link to='../create'>{i18n.t("LISTPROJECT.CREATE_BUTTON")}</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={24}>
              <Table
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={ProjectsColumnsTable(handleAction, handleChange, true)}
                loading={isLoading}
                dataSource={data?.data}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div className='form-create-light'>
          <Row gutter={[8, 4]} style={{ marginBottom: "1.5rem" }}>
            <Col span={4}>
              <Input
                placeholder={i18n.t("LISTPROJECT.PROJECT_NAME")}
                size='middle'
                allowClear
                onChange={(value) => handleChangeSearch(value.target.value)}
              />
            </Col>
            <Col span={6}>
              <Button type='primary' onClick={onSearch} size='middle'>
                <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
              </Button>
            </Col>
            <Col span={14} style={{ textAlign: "end" }}>
              <Button type='primary' size='middle'>
                <Link to='../create'>{i18n.t("LISTPROJECT.CREATE_BUTTON")}</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={ProjectsColumnsTable(handleAction, handleChange, true)}
                loading={isLoading}
                dataSource={data?.data}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
export default ListProject;
