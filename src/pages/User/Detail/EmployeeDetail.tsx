import DetailForm from "@/components/detail/Employee/DetailForm";
import { useGetDetailEmployee } from "@/hooks/useUser";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Spin } from "antd";
import { useParams } from "react-router-dom";
import "./EmployeeDetail.scss";

const EmployeeDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailEmployee(id as string);
  return (
    <div className='page-detail-employee'>
      <Breadcrumb
        items={[
          {
            title: <HomeOutlined />,
          },
          {
            href: "../list",
            title: (
              <>
                <UserOutlined />
                <span>Employee List</span>
              </>
            ),
          },
          {
            title: "Detail",
          },
        ]}
      />

      <br />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spin tip='Loading' size='large' spinning={isLoading}>
          <DetailForm data={data} />
        </Spin>
      </div>
    </div>
  );
};

export default EmployeeDetail;
