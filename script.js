class Question{
    static counterQuestions = 0;
    static totalScore = 0;
    constructor(question, answers, correctAnswer){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    static setCounter(counterQuestions){
         this.counterQuestions = counterQuestions;
    }
    static setScore(totalScore){
        this.totalScore = totalScore;
    }
    static getCounter(){
        return this.counterQuestions
    }
    static getScore(){
        return this.totalScore;
    }
    getCorrectAnswer(){
        return this.correctAnswer;
    }
    showQuestion(){
        let divQuestion = document.querySelector('.question');
        divQuestion.innerHTML = this.question;
    }
    showAnswers(){
        let divAnswers = document.querySelectorAll('.answers > div');
        for (let i = 0; i < this.answers.length; i++){
            divAnswers[i].innerHTML = this.answers[i];
            divAnswers[i].innerHTML += " <i class=\"fas fa-check\"></i>";
            divAnswers[i].setAttribute('data-click', 'click');
        }
    }
    static showProgressBar(){
        let divProgressText = document.querySelector('.progress div');
        divProgressText.innerHTML = `${this.counterQuestions + 1}/12`;
        let bar = document.getElementById('bar');
        bar.style.width = `${((this.counterQuestions + 1) / 12) * 100}` + '%';
    }
    static deleteChildElements() {
        let divContent = document.querySelector(".header");
        let lastChild = divContent.lastElementChild;

        while (lastChild) {
            divContent.removeChild(lastChild);
            lastChild  = divContent.lastElementChild;
        }
    }
    static setResultElements(){
        let spanProgressCorrect = document.querySelector('.resultProgress > span');
        let divConclusion = document.querySelector('.resultConclusion');
        let bgPicture = document.querySelector('.backgroundPicture');
        let resBlock = document.querySelector('.resultBlock');
        let divContent = document.querySelector('.content');
        divContent.style.display = 'none';
        resBlock.style.display = 'block';
        let bgPictureHeight = 679 + 412 * 2;
        bgPicture.style.height = `${bgPictureHeight}` + 'px';
        spanProgressCorrect.innerHTML = `${this.totalScore}`;

        spanProgressCorrect.after('/12');

        if (this.totalScore >= 0 && this.totalScore < 5){
            divConclusion.innerHTML = 'Маловато правильных ответов даже для человека ' +
                'с гуманитарным складом ума, ведь многие вопросы были общими.'
        }else if(this.totalScore >= 5 && this.totalScore < 9){
            divConclusion.innerHTML = 'Не много, не мало. Нормальный результат для' +
                ' «гуманитария». Если вы считаете, ' +
                'что у вас технический склад ума, значит вам просто попались не те вопросы.'
        }else{
            divConclusion.innerHTML = 'Ух ты! Вот это результат! У вас точно технический склад ума' +
                ' – гуманитариям ответы на многие вопросы не известны, потому что попросту не интересны.'
        }
    }
}

let question1 = new Question('Сколько мегабайт в 1 гигабайте?', ['1024', '1000', '10000'], '1024');
let question2 = new Question('Назовите формулу угарного газа', ['CO', 'CO2', 'C2O'], 'CO');
let question3 = new Question('Чему приблизительно равняется число Пи?', ['3,14', '3,48', '314'], '3,14');
let question4 = new Question('Президент фирмы «Майкрософт»', ['Стив Джобс', 'Дональд Трамп', 'Билл Гейтс'], 'Билл Гейтс');
let question5 = new Question('Единица измерения силы', ['Ньютон', 'Ом', 'Ампер'], 'Ньютон');
let question6 = new Question('Как называют жесткий диск компьютера?', ['Флопик', 'Хакер', 'Винчестер'], 'Винчестер');
let question7 = new Question('Какой прибор измеряет число оборотов двигателя?', ['Верстометр', 'Тахометр', 'Акселератор'], 'Тахометр');
let question8 = new Question('Что такое парабола в математике?', ['Кривая, симметричная своей оси', 'Параллельная прямая', 'Ветвь на оси координат'], 'Кривая, симметричная своей оси');
let question9 = new Question('Когда появился первый компьютер?', ['В 1938 году', 'В 1958 году', 'В 1974 году'], 'В 1938 году');
let question10 = new Question('В чём измеряется скорость корабля?', ['В узлах', 'В милях', 'В децибелах'], 'В узлах');
let question11 = new Question('Кто построил первый в России паровоз?', ['Отец и сын Черепановы', 'Братья Карамазовы', 'Сёстры Зайцевы'], 'Отец и сын Черепановы');
let question12 = new Question('Как называется диаграмма, показывающая при помощи кривых показатели чего-либо?', ['График', 'Функция', 'Диадема'], 'График');

let questionsArray = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12
];
question1.showQuestion();
question1.showAnswers();
Question.showProgressBar();
let resBlock = document.querySelector('.resultBlock');
resBlock.style.display = "none";
document.addEventListener('click', function (event) {
    if (event.target.dataset.click !== undefined ){
        let counter = Question.getCounter();
        let userAnswer = event.target.innerHTML.replace(" <i class=\"fas fa-check\"></i>", '');
        if (userAnswer === questionsArray[counter].getCorrectAnswer()){
            let score = Question.getScore();
            Question.setScore(score + 1);
        }
        if (counter < 11){
            Question.setCounter(counter + 1);
            questionsArray[counter + 1].showQuestion();
            questionsArray[counter + 1].showAnswers();
            Question.showProgressBar();
        }else if (counter === 11){
            let bgPicture = document.querySelector('.backgroundPicture');
            bgPicture.style.height = '100' + '%';
            Question.deleteChildElements();
            Question.setResultElements();
        }
    }
});