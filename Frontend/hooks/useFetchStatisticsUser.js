import { useEffect, useState } from "react";
import {
  fetchUserCreditsLost,
  fetchUserCreditsWon,
} from "../services/UserService";
import { useContext } from "react";
import { AuthContext } from "../contexts/WebSocketContext";

export const useFetchStatisticsUser = () => {
  const [userStatistics, setUserStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { total_credits_won } = await fetchUserCreditsWon(user.id);
        const { total_credits_lose } = await fetchUserCreditsLost(user.id);
        setUserStatistics({
          credits_won: total_credits_won,
          credits_lost: total_credits_lose,
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
