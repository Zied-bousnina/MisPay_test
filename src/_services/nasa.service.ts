import { guestHeader, ApiConfigs } from "../_helpers";
import localData from './data.json';

export const NasaService = {
  getAllNasaData,
};

async function getAllNasaData() {
  const requestOptions = {
    method: "GET",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
  };

  try {
    const response = await fetchWithRetry(
      `${ApiConfigs.base_url }`,
      requestOptions
    );
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching NASA data, using local data:", error);
    return localData; // Return local data on error, the api give me error code 429 that's mean i have passed the limit of request tha's why i use local data ( the same daa from the api )
  }
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const response = await fetch(url, options);

    if (response.status === 429) {


     console.log(`Rate limit `);
    } else {
      return response;
    }
  }
  throw new Error("Max retries exceeded");
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}