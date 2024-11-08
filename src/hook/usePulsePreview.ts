import { useEffect, useState } from "react";
import api from "../network";
import { IPulsePreview } from "../types";

export const usePulsePreview = (pulseID: number) => {
  const [pulse, setPulse] = useState<IPulsePreview | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPulse = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await api.get<IPulsePreview>(
          `/content/pulses/${pulseID}/preview`
        );
        if (response.status === 200) {
          setPulse(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPulse();
  }, [pulseID]);

  return {
    pulse,
    loading,
  };
};
