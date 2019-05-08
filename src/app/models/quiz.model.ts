// app/core/course.model.ts
// export class Quiz {
//   constructor(
//     public id: number,
//     public code: string,
//     public name: string,
//     public created: Date,
//   ) { }
// }

export interface Question {
    correctAnswer: number,
    id: number,
    quizID: number,
    quizName: string,
    quizThemeID: number,
    quizThemeName: string
}

export interface QuizTheme {
    id: number,
    quizID: number,
    quizThemeName: String,
    quizName: String
}

export interface ExamType {
    id: number,
    examTypeName: String
}

export class Quiz {
    id: number;
    quizName: String;
    quizThemes: null; 
    questionTypes: null; 
    answerTypes: null;
    questions: null;
}


// public class QuizData { 
//     public int ID { get; set; }        
// public int QuizThemeID { get; set; }        
// public int QuestionTypeID { get; set; }        
// public int AnswerTypeID { get; set; }        
// public string QuizName { get; set; }        
// public string QuizThemeName { get; set; }        
// public string QuestionTypeName { get; set; }        
// public string AnswerTypeName { get; set; }    
// }


