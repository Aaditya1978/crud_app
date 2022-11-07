import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.users = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((user) => user._id === action.payload._id);
            state.users[index] = action.payload.user;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload);
        },
    },
});

export const { setUser, addUser, deleteUser, updateUser } = userReducer.actions;

export default userReducer.reducer;