import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDevelopers = async () => {
  const response = await api.get("/developers/");
  return response.data;
};

export const getDeveloperProfile = async (name) => {
  const response = await api.get(
    `/developers/${encodeURIComponent(name)}/`
  );

  return response.data;
};

export const searchDevelopers = async (skill) => {
  const response = await api.get("/search/", {
    params: {
      skill,
    },
  });

  return response.data;
};

export const getDeveloperTechnologies = async (name) => {
  const response = await api.get(
    `/developers/${encodeURIComponent(name)}/technologies/`
  );

  return response.data;
};

export const getRelatedDevelopers = async (name) => {
  const response = await api.get(
    `/developers/${encodeURIComponent(name)}/related/`
  );

  return response.data;
};

export const getGraphData = async () => {
  const response = await api.get("/graph/");
  return response.data;
};