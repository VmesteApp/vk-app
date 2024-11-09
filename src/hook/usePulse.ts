import { useEffect, useMemo, useState } from "react";
import api from "../network";
import { IPulse } from "../types";
import { getStorageValue } from "../utils";
import { VMESTE_USER_ID } from "../constants";

export const usePulse = (pulseID: number) => {
  const [pulse, setPulse] = useState<IPulse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userID, setUserID] = useState<number | null>(null);

  const fetchPulse = async () => {
    if (loading) return;
    setLoading(true);

    api
      .get<IPulse>(`/content/pulses/${pulseID}`)
      .then((response) => {
        if (response.status === 200) {
          setPulse(response.data);
        }
      })
      .catch((error) =>
        setErrorMessage(
          error.response?.data?.message ||
            error.response?.data?.detail ||
            "Unknown error"
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const getUserID = async () => {
      const userID = await getStorageValue(VMESTE_USER_ID);

      setUserID(Number(userID));
    };

    fetchPulse();
    getUserID();
  }, [pulseID]);

  const currentUserIsAdmin = useMemo(
    () => pulse?.founder_id === userID,
    [pulse, userID]
  );

  return {
    errorMessage,
    pulse,
    loading,
    currentUserIsAdmin,
    updatePulse: fetchPulse
  };
};
