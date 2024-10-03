import {
  fetchUserCreditsLost,
  fetchUserCreditsWon,
} from "../services/UserService";
import { useState, useEffect } from "react";

export const useFetchCreditsHistory = (userId) => {
  const [userHistory, setUserHistory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creditsWon = await fetchUserCreditsWon(userId);
        const creditsLoss = await fetchUserCreditsLost(userId);
        setUserHistory({
          creditsWon: creditsWon.total_credits_won,
          creditsLoss: creditsLoss.total_credits_won,
        });
      } catch (error) {
        console.error("Error fetching user history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { userHistory, loading };
};
