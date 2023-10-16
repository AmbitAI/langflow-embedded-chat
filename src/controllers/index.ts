import axios from "axios";

export async function sendMessage(
  baseUrl: string,
  flowId: string,
  message: string,
  inputs: any,
  input_field: string,
  tweaks?: Object,
  api_key?: string,
  session_id?: string
) {
  let data;
  inputs[input_field] = message;
  if (tweaks) {
    data = { inputs: inputs, tweaks: tweaks };
  } else {
    data = {
      inputs: inputs,
      ...(session_id && { session_id: session_id }),
    };
  }

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  if (api_key) {
    headers["x-api-key"] = api_key;
  }
  let response = axios.post(`${baseUrl}/api/v1/process/${flowId}`, data, {
    headers,
  });
  return response;
}
