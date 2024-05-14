import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    id: number;
    user: string
    userType: string;
    islogin: boolean;
}

const initialState: UserState = {
    id: 0,
    user: "",
    userType: "",
    islogin: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.user = action.payload.user;
            state.userType = action.payload.userType;
            state.islogin = action.payload.islogin;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;