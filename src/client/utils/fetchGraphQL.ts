import fetch from "node-fetch";
// import axios from "axios";
import { SERVER_URL } from "../../../config";

interface ResponseJSON {
  data: any | undefined
  errors: [Error] | undefined
}

const fetchGraphQL = async (query: string, variables = {}): Promise<any> => {
  const res = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const { data, errors } = (await res.json()) as ResponseJSON;

  if (errors?.length) {
    console.error(errors);
  }

  // if (!process.env.NODE_ENV?.startsWith("prod")) console.log(data);

  return data;

  /*
  try {
    const { data } = await axios.post(SERVER_URL, {
      query,
      variables
    });
    return data;
  } catch ({ message }) {
    console.error(message);
    return null;
  }
  */
};

export default fetchGraphQL;
