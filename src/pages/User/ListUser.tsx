import { Table } from "@/components/core/Table/Table";
import { useDeleteUser, useGetAccounts, useGetCv } from "@/hooks/useUser";
import { IUser } from "@/interfaces/user/users.interface";
import { RootState } from "@/redux/store";
import { Button, Col, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./ListUser.scss";
import { UsersColumnsTable } from "./UserListColumn";

const ListUser = () => {
  const { theme } = useSelector((state: RootState) => state.global);
  const { t } = useTranslation();
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
  const { data, isLoading, refetch, isFetching } = useGetAccounts(paginatorSearch);

  const { mutate: exportCv } = useGetCv();
  useEffect(() => {
    if (filterName === "") {
      setFilterName("");
      refetch();
    }
  }, [filterName, refetch]);

  const handleChangeSearch = (value: string) => {
    if (value === "") {
      Promise.all([setFilterName(""), refetch()]);
    } else {
      setFilterName(value);
    }
  };

  const navigate = useNavigate();
  const { mutate: onDeleteUser } = useDeleteUser();

  const handleAction = (key: string, item: IUser) => {
    switch (key) {
      case "down":
        exportCv(item.id);
        break;
      case "edit":
        navigate(`/employees/update/${item.id}`);
        break;
      case "detail":
        navigate(`/employees/detail/${item.id}`);
        break;
      case "delete":
        //  eslint-disable-next-line no-case-declarations
        const fullName = item.profile.fullName || "";
        Modal.confirm({
          title: t("DELETE_USER.TITLE_DELETE", { name: fullName }),
          content: t("DELETE_USER.CONFIRM_DELETE", { name: fullName }),
          okText: t("DELETE_USER.OK"),
          cancelText: t("DELETE_USER.CANCEL"),
          onOk: () => onDeleteUser({ id: item.id }),
        });
        break;
      default:
    }
  };
  const handleSearch = () => {
    setTable({
      page: 1,
      take: 10,
    });
    refetch();
  };

  return (
    <div className='page-list-project'>
      {theme === "dark" ? (
        <div className='form-create-dark'>
          <Row gutter={[8, 4]} style={{ marginBottom: "1.5rem" }}>
            <Col span={4}>
              <Input
                placeholder={t("TABLE.SEARCH_NAME")}
                size='middle'
                value={filterName}
                allowClear
                onChange={(value) => handleChangeSearch(value.target.value)}
              ></Input>
            </Col>
            <Col span={6}>
              <Button type='primary' loading={isFetching} onClick={handleSearch} size='middle'>
                <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
              </Button>
            </Col>
            <Col span={14} style={{ textAlign: "end" }}>
              <Button type='primary' size='middle'>
                <Link to='../createEmployee'>{t("LISTUSER.CREATE_BUTTON")}</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table<IUser>
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={UsersColumnsTable(handleAction)}
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
                placeholder={t("TABLE.SEARCH_NAME")}
                size='middle'
                value={filterName}
                allowClear
                onChange={(value) => handleChangeSearch(value.target.value)}
              ></Input>
            </Col>
            <Col span={6}>
              <Button type='primary' loading={isFetching} onClick={handleSearch} size='middle'>
                <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
              </Button>
            </Col>
            <Col span={14} style={{ textAlign: "end" }}>
              <Button type='primary' size='middle'>
                <Link to='../createEmployee'>{t("LISTUSER.CREATE_BUTTON")}</Link>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table<IUser>
                paginate={{
                  table,
                  setTable,
                  total: data?.meta.itemCount || 1,
                  pageCount: data?.meta.pageCount || 10,
                }}
                columns={UsersColumnsTable(handleAction)}
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
export default ListUser;
