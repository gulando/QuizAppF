// app/core/course.model.ts
// export class Quiz {
//   constructor(
//     public id: number,
//     public code: string,
//     public name: string,
//     public created: Date,
//   ) { }
// }

export class Answer {
    correctAnswer: any = "";
    maxScore: number = 0;
    score: number = 0;
}

export interface Question {
    questionTypeID: number,
    answerTypeID: number,
    id: number,
    questionText: string,
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

export interface AnswerType {
    "id": number,
    "quizID": number,
    "questionTypeID": number,
    "quizName": String,
    "questionTypeName": String,
    "answerTypeName": String,
    "answerTypeConfiguration" : {
        "type" : String,
        "count": number,
        "correctCount": number,
        "rowCount": number
    } 
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


