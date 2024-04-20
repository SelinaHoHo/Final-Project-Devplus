import DetailProjectCom from "@/components/detail/DetailProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { LeftSquareOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./detailProject.scss";

const { Title } = Typography;
const DetailProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetDetailProject(id as string);
  return (
    <div className='page-detail-project'>
      <Flex gap={32} style={{ marginLeft: 10 }}>
        <LeftSquareOutlined style={{ fontSize: 25 }} onClick={() => navigate(-1)} />
        <Title level={3}>{data?.name}</Title>
      </Flex>
      {isLoading ? <p>Loading...</p> : <DetailProjectCom data={data} />}
    </div>
  );
};

export default DetailProject;
