import DetailForm from "@/components/detail/Employee/DetailForm";
import { useGetDetailEmployee } from "@/hooks/useUser";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
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

      {isLoading ? <p>Loading...</p> : <DetailForm data={data} />}
    </div>
  );
};

export default EmployeeDetail;
