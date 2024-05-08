import { useState, useEffect } from "react";
import doFetch from "../../utils/doFetch";

export default function useDoFetch(url, options) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await doFetch(url, options);
        setData(result.data);
        setMetaData(result.meta);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError, metaData };
}
