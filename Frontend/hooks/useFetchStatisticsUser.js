import { useEffect, useState } from "react";
import { fetchUserMatches, fetchLeaderBoard } from "../services/UserService";

export const useFetchStatisticsUser = () => {
  const [userStatistics, setUserStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserMatches();
        const leaderboard = await fetchLeaderBoard();
        setUserStatistics({
          ...data,
          leaderboard: leaderboard,
        });
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { userStatistics, loading };
};
