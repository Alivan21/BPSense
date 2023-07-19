"use client";
import { API_URL } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type SearchRequest = {
  nip: string;
  birth_date: string;
};

export function useTestSearch() {
  const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfTokenMeta?.getAttribute("content") || "";
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "X-CSRF-TOKEN": csrfToken,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    withCredentials: true,
  });
  return useMutation({
    mutationFn: async (input: SearchRequest) => {
      const formData = new FormData();
      formData.set("nip", input.nip);
      formData.set("birth_date", input.birth_date);
      const res = await api.post(`${API_URL}/user/search`, formData);
      return res;
    },
  });
}
