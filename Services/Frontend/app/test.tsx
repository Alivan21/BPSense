"use client";
import { API_URL, BaseResponse } from "@/utils/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";
import React from "react";

type SearchRequest = {
  nip: string;
  birth_date: string;
};

// type UseTestProps = {
//   onProgress: (progress: AxiosProgressEvent) => void;
// };

function Test() {
  function handleButton() {
    const test = useMutation({
      mutationFn: async (input: SearchRequest) => {
        const formData = new FormData();
        formData.set("nip", input.nip);
        formData.set("birth_date", input.birth_date);
        const { data } = await axios.post<BaseResponse<any>>(`${API_URL}/search`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
      },
    });
    const data = test.mutate({ nip: "12345678", birth_date: "1999-01-01" });
    console.log(data);
  }

  const testClick = () => {
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfTokenMeta?.getAttribute("content") || "";
    console.log(csrfToken);
  };

  return (
    <div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        onClick={testClick}
      >
        Test API Button
      </button>
    </div>
  );
}

export default Test;
