import { useEffect, useState } from "react";
import api from "../network";
import { IApplicationWithCandidate } from "../types";

export const usePulseApplications = (pulseID: number) => {
  const [applications, setApplications] = useState<IApplicationWithCandidate[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPulse = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await api.get<{
          application: IApplicationWithCandidate[];
        }>(`/content/application/${pulseID}`);

        if (response.status === 200) {
          setApplications(response.data.application);
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
    applications,
    loading,
  };
};
