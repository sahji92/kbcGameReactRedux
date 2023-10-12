import { createSlice, createAsyncThunk } from "@redux/toolkit";
//using thunk to api asynchronously
//createAsyncThunk provided by redux toolkit so that we dont need to insatll thunk saperately
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple"
      );
      return res.json();//we put await so that json will be returned only after fetching the whole Api(in background).
    } catch (err) {
      console.log(err);
    }
  }
);
//using shuffling so that correct answers dont have fix index(every time index of correct ans would be random b/w 1-4)
const shuffle=(array)=>{
for(let i=array.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [array[i],array[j]]=[array[j],array[i]];
}
return array;
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    status: "loading",
    currentQuestion:{},
    currentAnswer:''
  },
  reducers: {
    setCurrentQuestion:(state,{payload})=>{
        state.currentQuestion={
            question:state.questions[payload].question,
            answers:shuffle(...state.questions[payload].incorrect_answers,state.questions[payload].correct_answers)
        }
        state.currentAnswer=state.questions[payload].correct_answer
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getQuestions.pending,(state)=>{
        state.status='loading'
    }).addCase( getQuestions.fullfilled,(state,{payload})=>{
        state.status='ready'
        console.log('Here are the questions',payload)
        state.questions=[...payload.results]
        state.currentQuestion={
            question:payload.results[0].question,
            answers:shuffle(...payload.results[0].incorrect_answers,payload.results[0].correct_answers)
        }
        state.currentAnswer=payload.results[0].correct_answer
    }).addCase(getQuestions.rejected,(state)=>{
        state.status='error'
    })
  }
});
export default questionsSlice.reducers
