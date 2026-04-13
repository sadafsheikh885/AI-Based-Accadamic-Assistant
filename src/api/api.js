import axios from "axios";

/* CHATBOT API */
export const apiCall = async (message) => {
  const res = await axios.post(
    "http://localhost:5000/api/chat",
    { message }
  );
  return res.data.reply;
};

export const generateStudyPlan = async (subject, notes, days) => {
  const res = await axios.post(
    "http://localhost:5000/api/generate-plan",
    {
      subject,
      notes,
      days
    }
  );

  return res.data.result;
};
/* ---------- STUDY PLAN FROM FILE ---------- */
export const generateStudyPlanFromFile = async (formData) => {
  const res = await axios.post(
    "http://localhost:5000/api/generate-plan-file",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.result;
};
export const askAIHelp = async (question) => {
  const res = await axios.post(
    "http://localhost:5000/api/chat",
    { message: question }
  );
  return res.data.reply;
};

export const sendMessage = async (msg) => {
  const res = await axios.post(
    "http://localhost:5000/api/contact",
    { message: msg }
  );
  return res.data;
};
export const uploadFile = async (formData) => {
  const res = await axios.post(
    "http://localhost:5000/api/upload",
    formData
  );
  return res.data;
};


const BASE_URL = "http://localhost:5000/api";

/* REGISTER */
export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
};

/* LOGIN */
export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};