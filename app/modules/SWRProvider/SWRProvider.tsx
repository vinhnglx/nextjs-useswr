import React from "react";
import { SWRConfig as BaseSWRConfig } from "swr";

import { makeFullUrlApiCall } from "app/middleware/api/helpers";

const fetcher = async (endpoint: string) => {
  const res = await makeFullUrlApiCall(endpoint);
  return res.data;
};

const config = {
  fetcher: fetcher,
  shouldRetryOnError: false,
  revalidateOnFocus: false,
};

export const SWRProvider = ({ ...props }) => (
  <BaseSWRConfig {...props} value={config} />
);
