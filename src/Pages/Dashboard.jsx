import Board from "../components/Board";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="px-8 py-6">
        <Board />
      </main>
    </div>
  );
};

export default Dashboard;
