import { createSlice } from "@reduxjs/toolkit";
const initialState={
  playerName:'',
  earnedMoney:'0'
}
export const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    addPlayerName:(state,{payload})=>{
      state.playerName=payload
    },
    updateEarnedMoney:(state,{payload})=>{
     state.earnedMoney=payload
    },
    resetPersonalData:()=>initialState
  },
});
export const {addPlayerName,updateEarnedMoney,resetPersonalData}=personalDataSlice.actions
export default personalDataSlice.reducer
