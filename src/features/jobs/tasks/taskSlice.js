import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: { taskId: undefined },
  reducers: {
    setTaskId: (state, action) => {
      const taskId = action.payload;
      state.taskId = taskId;
    },
  },
});

export const { setTaskId } = taskSlice.actions;
export default taskSlice.reducer;

export const selectCurrentTask = (state) => state.task.taskId;
