import useAuth from "../../components/store/auth";

export function useFetchOptions() {
  const { getToken, getApiKey } = useAuth();

  const getData = () => ({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  });

  const postData = (data) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(data),
  });

  const updateData = (data) => ({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
    body: JSON.stringify(data),
  });

  const deleteData = () => ({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  });

  return { getData, postData, updateData, deleteData };
}
