export default async function doFetch(url, customOptions = {}) {
  try {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...customOptions,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error("Unable to fetch data");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
}
