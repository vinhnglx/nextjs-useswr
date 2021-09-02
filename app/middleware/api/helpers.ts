import axios from "axios";
import { CallAPIOptions, RequestMethod } from "./interfaces";

export const makeApiCall = (
  fullUrl: string,
  options: CallAPIOptions = {},
  method: RequestMethod = "get"
) => {
  const { headers, ...redactedOptions } = options;
  const headerOptions = { headers };

  const methodHandlers = {
    get: () => axios(fullUrl, options),
    put: () => axios.put(fullUrl, redactedOptions, headerOptions),
    post: () => axios.post(fullUrl, redactedOptions, headerOptions),
    delete: () => axios.delete(fullUrl, options),
  };

  return methodHandlers[method]();
};

export function makeFullUrlApiCall(
  endpoint: string,
  options?: CallAPIOptions,
  method: RequestMethod = "get",
  basePath?: string
) {
  return makeApiCall(endpoint, options, method);
}
