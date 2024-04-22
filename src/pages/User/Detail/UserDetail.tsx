import EmployeeDetail from "@/components/detail/Employee/EmployeeDetailForm";
import { LeftSquareOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./UserDetail.scss";

const { Title } = Typography;
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className='page-detail-employee'>
      <h2>User Details for ID: {id}</h2>
      <Flex gap={32} style={{ marginLeft: 10 }}>
        <LeftSquareOutlined style={{ fontSize: 25 }} onClick={() => navigate(-1)} />
        <Title level={3}>THINH</Title>
      </Flex>
      <EmployeeDetail />
    </div>
  );
};

export default UserDetail;
