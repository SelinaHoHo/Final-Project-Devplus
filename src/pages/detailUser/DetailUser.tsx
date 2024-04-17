import { Col, Row } from "antd";
import { useParams } from "react-router-dom";

const DetailUser = () => {
  const { id } = useParams();
  // const userDetails = useGetAccounts(id);
  return (
    <div>
      <h2>User Details for ID: {id}</h2>
      <Row>
        <Col span={18} push={6}>
          col-18 col-push-6
        </Col>
        <Col span={6} pull={18}>
          col-6 col-pull-18
        </Col>
      </Row>
    </div>
  );
};

export default DetailUser;
