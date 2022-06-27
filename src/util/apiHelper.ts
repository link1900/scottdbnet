
export interface ValidRequestOptions extends RequestInit {
  url: string;
}

export interface ValidJsonRequestOptions
  extends Omit<RequestInit, "body" | "headers"> {
  url: string;
  body?: object;
  headers?: { [key: string]: string };
}

export async function makeRequest(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (error) {
    const message = combineErrorMessages("Error calling external api", error);
    throw new Error(message);
  }
}

export async function makeValidRequest(
  options: ValidRequestOptions
): Promise<Response> {
  const { url, ...fetchOptions } = options;
  const apiResponse = await makeRequest(url, fetchOptions);

  if (apiResponse.ok) {
    return apiResponse;
  } else {
    const errorBodyText = await apiResponse.text();
    throw new Error(`Error calling external api. http status code: ${apiResponse.status} body: ${errorBodyText}`);
  }
}

export async function makeValidJsonRequest<ResponseType>(
  options: ValidJsonRequestOptions
): Promise<ResponseType> {
  const { url, body: jsonBody, headers = {}, ...passedFetchOptions } = options;

  // force the headers to be json
  headers["Content-Type"] = "application/json";
  headers.Accept = "application/json";

  const fetchBody =
    jsonBody !== undefined ? JSON.stringify(jsonBody) : undefined;

  const fetchOptions = {
    url,
    body: fetchBody,
    headers,
    ...passedFetchOptions,
  };

  const response = await makeValidRequest(fetchOptions);

  if (response.status === 204) {
    // assume response type allows empty body for 204
    return {} as ResponseType;
  }

  try {
    return await response.json();
  } catch (error) {
    const message = combineErrorMessages(
      "Error reading external api response. Expected response body to be json but failed to parse",
      error
    );
    throw new Error(message);
  }
}

export function combineErrorMessages(message: string, error: Error | unknown): string {
  if (error instanceof Error) {
    return `${message}. Original Error: ${error?.message}`
  } else {
    return message;
  }
}
