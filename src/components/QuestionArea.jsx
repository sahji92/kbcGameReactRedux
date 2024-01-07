import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { delay } from '../utils/delay'
import { updateCurrentLevel, updateGameStatus } from '../slices/gameDataSlice'
import { updateEarnedMoney } from '../slices/personalDataSlice'
import { setCurrentQuestion } from '../slices/questionsSlice'
import useSound from "use-sound";
import wrong from '../assets/sounds_wrong.mp3'
import play from '../assets/sounds_play.mp3'
import correct from '../assets/sounds_correct.mp3'


export default function QuestionArea() {
  const [currentClass,setCurrentClass]=useState("answer")//for button colors
  const [selectedAnswer,setSelectedAnswer]=useState("")
  const dispatch=useDispatch()
  const gameLevels=useSelector((state)=>state.gameData.gameLevels)
  const questionData=useSelector((state)=>state.questions)
//questiondata.currentquestion.question......-->if questiondata.status is not loading(by default its loading) the show the question with answer options(data inside questionbox)

const [letsPlay] = useSound(play);

const [playCorrect] = useSound(correct);

const [playWrong] = useSound(wrong);
const nextQuestion=()=>{
  playCorrect()
  let earnedMoney=gameLevels.totalLevels.find((item)=>item.id===gameLevels.currentLevelId).amount;//getting amount of current question id
  dispatch(updateEarnedMoney(earnedMoney))

  //diselecting the selected answer before going to next question
  setSelectedAnswer('')
  setCurrentClass('answer')
  if(gameLevels.currentLevelId>=gameLevels.totalLevels.length)//checking what to do if last question is correct
  {
    dispatch(updateGameStatus("win"))
    return;//so that next 2 lines wont execute
  }
  dispatch(updateCurrentLevel())
  dispatch(setCurrentQuestion(gameLevels.currentLevelId))
}
 
const handleSubmit=(ans)=>{
  setSelectedAnswer(ans);
  setCurrentClass('answer active')//setting blue color for selected answer button 
  delay(3000,()=>{
    ans===questionData.currentAnswer
    ?setCurrentClass('answer correct')
    :setCurrentClass('answer wrong')
  })//setting 3 sec delay to decide which color should appear(R or G)
  if(ans===questionData.currentAnswer){
     delay(5000,()=>nextQuestion())
  }
  else{
    delay(5000,()=>{
      playWrong()
      dispatch(updateGameStatus('loose'))})//adding arrow func so that dispatch function didnt executed here itself
  }
}
useEffect(() => {
  letsPlay()
}, [letsPlay]);
  return (
    <div className='questionArea'>
      <div className='top'>
      </div>
      <div className='bottom'>
        {questionData.status!=='loading'&& <div className='questionBox'>
       <div className='question'>{parse(questionData.currentQuestion.question)}</div>
       <div className='answers'>
          {
            questionData.currentQuestion.answers.map((ans,index)=>(
              <div key={index} className={selectedAnswer===ans ? currentClass:'answer'} onClick={()=>handleSubmit(ans)}>{parse(ans)}</div>
            ))
          }
       </div>
      </div>}
    </div>
    </div>
  )

        }