type ENV = "dev" | "stage" | "prod";

const env = (document.documentElement.dataset.env as ENV) || "stage";

const config = {
  dev: {
    baseUrl: "/api",
    uploadUrl: "",
    mock: true,
    mockUrl: "",
  },
  stage: {
    baseUrl: "/stage-api",
    uploadUrl: "",
    mock: false,
    mockUrl: "",
  },
  prod: {
    baseUrl: "/prod-api",
    uploadUrl: "",
    mock: true,
    mockUrl: "",
  },
};

export default {
  env,
  ...config[env],
};
