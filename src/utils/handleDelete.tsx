import axios from "axios";
import { useSession } from "../contexts/AuthContext";

export function handleDelete(resource: string, id: string, session: string): Promise<string> {
  

  return axios.delete(`https://express-app-store-api-6f6c8ec32640.herokuapp.com/api/${resource}/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
    .then((response) => {
      return response.status === 200 ? "deleted" : "not deleted";
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
