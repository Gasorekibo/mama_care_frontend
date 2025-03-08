import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/email/send`, emailData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);


export const emailSlice = createSlice({
    name: 'email',
    initialState: {
        email: null,
        error: null,
        loading: false,
    },
    extraReducers: builder => {
        builder.addCase(sendEmail.pending, (state) => { 
            state.loading = true;
            state.error = null;
        })
        .addCase(sendEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.email = action.payload;
        })
        .addCase(sendEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default emailSlice.reducer;