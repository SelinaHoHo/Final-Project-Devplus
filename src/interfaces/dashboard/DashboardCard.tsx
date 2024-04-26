import { Card, Space, Statistic } from "antd";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value }) => (
  <Card className='cardBoard'>
    <Space direction='horizontal'>
      {icon}
      <Statistic title={title} value={value} />
    </Space>
  </Card>
);

export default DashboardCard;
