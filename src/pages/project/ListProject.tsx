import { Button } from "antd";
import { Link } from "react-router-dom";

const ListProject = () => {
  return (
    <div>
      <Button type='primary'>
        <Link to='../create'>Create Project</Link>
      </Button>

      <div>ListProject</div>
    </div>
  );
};

export default ListProject;
