import DetailProjectCom from "@/components/detail/DetailProjectForm";
import { useGetDetailProject } from "@/hooks/useProject";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import "./detailProject.scss";

const { Title } = Typography;
const DetailProject = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailProject(id as string);
  return (
    <div className='page-detail-project'>
      <Title level={2}>{data?.name}</Title>
      {isLoading ? <p>Loading...</p> : <DetailProjectCom data={data} />}
    </div>
  );
};

export default DetailProject;
