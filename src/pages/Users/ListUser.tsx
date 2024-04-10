import { Button } from "antd";
import { Link } from "react-router-dom";

const ListUser = () => {
  return (
    <div>
      <Button type='primary'>
        <Link to='../createUser'>Create User</Link>
      </Button>

      <div>ListUser1</div>
    </div>
  );
};

export default ListUser;
