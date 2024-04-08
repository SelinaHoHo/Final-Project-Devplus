import { useGetAccounts } from "@/hooks/useUser";

const Dashboard = () => {
  const { data, isLoading } = useGetAccounts();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <ul>
            {data?.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Dashboard;
