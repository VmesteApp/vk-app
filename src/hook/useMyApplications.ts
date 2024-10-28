import { useEffect, useState } from "react";
import api from "../network";
import { IApplication } from "../types";

export const useMyApplications = () => {
  const [myApplications, setMyApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMyApplications = async () => {
      setLoading(true);
      try {
        const response = await api.get<{ application: IApplication[] }>(
          "/content/application/my/"
        );

        if (response.status === 200) {
          setMyApplications(response.data.application);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  return {
    myApplications,
    loading,
  };
};
