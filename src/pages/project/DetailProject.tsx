import DetailProjectCom from "@/components/detail/detailProject";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import "./detailProject.scss";
// import { useParams } from "react-router-dom";

const { Title } = Typography;
const DetailProject = () => {
  // const { theme } = useSelector((state: RootState) => state.global);
  // const { id } = useParams();
  const { t } = useTranslation();
  return (
    <div className='page-detail-project'>
      <Title level={2}>{t("DETAIL_PROJECT.NAME")}</Title>
      <DetailProjectCom />
      {/* {theme === "dark" ? (
        <div className='detail-project-dark'>
          <DetailProjectCom />
        </div>
      ) : (
        <div className='detail-project-light'>
          <DetailProjectCom />
        </div>
      )} */}
    </div>
  );
};

export default DetailProject;
