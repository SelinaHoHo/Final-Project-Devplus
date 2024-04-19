import { Table } from "@/components/core/Table/Table";
import i18n from "@/config/i18n";
import { useDeleteUser, useGetAccounts } from "@/hooks/useUser";
import { IUser } from "@/interfaces/user/users.interface";
import { Button, Col, Input, Modal, Row } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Translation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UsersColumnsTable } from "./UserListColumn";

const ListUser = () => {
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
  const { data, isLoading, refetch } = useGetAccounts(paginatorSearch);

  useEffect(() => {
    if (filterName === "") {
      setFilterName("");
      refetch();
    }
  }, [filterName, refetch]);

  const handleChangeSearch = (value: string) => {
    if (value === "") {
      setFilterName("");
      refetch();
    } else {
      setFilterName(value);
    }
  };

  const navigate = useNavigate();
  const { mutate: onDeleteUser } = useDeleteUser();
  const handleAction = (key: string, item: IUser) => {
    switch (key) {
      case "detail":
        navigate(`/users/detail/${item.id}`);
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
    <>
      <Row gutter={5}>
        <Col>
          <Input
            placeholder={i18n.t("TABLE.SEARCH_NAME")}
            size='large'
            allowClear
            onChange={(value) => handleChangeSearch(value.target.value)}
          ></Input>
        </Col>
        <Col>
          <Button type='primary' onClick={handleSearch} size='large'>
            <Translation>{(t) => t("TABLE.SEARCH")}</Translation>
          </Button>
        </Col>
      </Row>
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
    </>
  );
};
export default ListUser;
