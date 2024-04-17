/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataType, SkillType, UserType } from "@/interfaces/user/users.interface";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type DataProps = {
  employeeData: DataType;
  dataSource: DataType[];
  defaultColumns: ColumnsType<DataType>;
  handleAddEmployee: (type: string, data: any) => void;
  handleAddRow: () => void;
};

type EmployeeFormTableProps = {
  data: DataProps;
};

const EmployeeFormTable: FC<EmployeeFormTableProps> = ({ data }) => {
  const { dataSource, defaultColumns, employeeData, handleAddRow, handleAddEmployee } = data;
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = defaultColumns;

  return (
    <Row gutter={[8, 4]}>
      <Col xs={24} sm={24} md={24} lg={12}>
        <Form.Item
          name='employeeId'
          label={t("CREATE_PROJECT.EMPLOYEE")}
          labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
        >
          <Select
            style={{ width: "100%" }}
            placeholder={t("CREATE_PROJECT.EMPLOYEE_NAME") as string}
            showSearch
            notFoundContent={null}
            onChange={(e) => handleAddEmployee("name", e)}
            value={employeeData?.name}
          >
            {[].map(
              (item: UserType) =>
                !item.isManager && (
                  <Select.Option key={item?.id} value={item?.id}>
                    {item?.userName}
                  </Select.Option>
                ),
            ) || []}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12}>
        <Form.Item
          name='roles'
          label={t("CREATE_PROJECT.ROLES")}
          labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
        >
          <Select
            mode='multiple'
            style={{ width: "100%" }}
            placeholder={t("CREATE_PROJECT.EMPLOYEE_ROLES") as string}
            notFoundContent={null}
            options={[{ id: "123", name: "hi" }].map((item: SkillType) => ({
              value: item.name,
              label: item.name,
            }))}
            onChange={(e) => handleAddEmployee("roles", e)}
            value={employeeData?.roles}
          />
        </Form.Item>
      </Col>
      <Col xs={12} sm={12} md={12} lg={12}>
        <Form.Item>
          <Button onClick={handleAddRow} type='dashed' block icon={<PlusOutlined />}>
            {t("CREATE_PROJECT.CREATE_EMPLOYEE")}
          </Button>
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24}>
        <Form.Item
          name={"employees"}
          labelCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          wrapperCol={{ xs: 24, sm: 24, md: 24, lg: 24 }}
          label={t("CREATE_PROJECT.EMPLOYEE_LIST")}
        >
          <Table<DataType>
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EmployeeFormTable;
