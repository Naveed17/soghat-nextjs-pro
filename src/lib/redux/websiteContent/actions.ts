import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWebsiteContent } from "@src/actions";
// Fetch primary color from the API

export const fetchWebContent = createAsyncThunk(
  "websiteContent/fetchWebContent",
  async () => {
    const response = await fetchWebsiteContent();
    const { WebsiteContentFind, ...rest } = response;
    const data = rest;
    return {
      primary: WebsiteContentFind.primary_color,
      textColor: WebsiteContentFind.text_color,
      websiteContent: WebsiteContentFind,
      data,
    };
  }
);
