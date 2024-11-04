import { useEffect, useState } from "react";
import api from "../network";
import { IPulse } from "../types";

export const useMyPulses = () => {
  const [myPulses, setMyPulses] = useState<IPulse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyPulses = async () => {
      setLoading(true);
      try {
        const response = await api.get<{ pulses: IPulse[] }>("/content/pulses/my");

        if (response.status === 200) {
          setMyPulses(response.data.pulses);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPulses();
  }, []);

  return {
    myPulses,
    loading,
  };
};
