import { createSlice} from "@redux/toolkit";

export const personalDataSlice = createSlice({
  name: "personalData",
  initialState: {
    playerName:'',
    earnedMoney:'0'
  },
  reducers: {
    addPlayerName:(state,{payload})=>{
      state.playerName=payload
    },
    updateEarnedMoney:(state,{payload})=>{
     state.earnedMoney=payload
    }
  },
});
export const {addPlayerName,updateEarnedMoney}=personalDataSlice.actions
export default personalDataSlice.reducer
