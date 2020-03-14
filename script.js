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
        let divQuestion = document.querySelector('.quiz > .question');
        divQuestion.innerHTML = this.question;
    }
    showAnswers(){
        let divAnswers = document.querySelectorAll('.quiz > .answers > a');
        for (let i = 0; i < this.answers.length; i++){
            divAnswers[i].innerHTML = this.answers[i];
            divAnswers[i].setAttribute('data-click', 'click');
        }
    }
    static showProgressBar(){
        let divProgressText = document.querySelector('.progress div:first-child');
        divProgressText.innerHTML = `${this.counterQuestions + 1}/12`;
        let bar = document.getElementById('bar');
        bar.style.width = `${((this.counterQuestions + 1) / 12) * 100}` + '%';
    }
    static deleteChildElements() {
        let divContent = document.querySelector(".content");
        let lastChild = divContent.lastElementChild;

        while (lastChild) {
            divContent.removeChild(lastChild);
            lastChild  = divContent.lastElementChild;
        }
    }
    static setResultElements(){
        let divContent = document.querySelector(".content");
        let divProgressText = document.createElement('div');
        let spanProgressCorrect = document.createElement('span');
        let divResultText = document.createElement('div');
        let divYourQuestions = document.createElement('div');
        let divIcons = document.createElement('div');

        divContent.style.width = '80' + '%';
        divProgressText.style.marginBottom = '50' + 'px';
        divProgressText.style.marginTop = '30' + 'px';

        spanProgressCorrect.innerHTML = `${this.totalScore}`;
        spanProgressCorrect.classList.add('resultHighlight');

        divContent.append(divProgressText);
        divProgressText.append(spanProgressCorrect);
        spanProgressCorrect.after('/12');

        if (this.totalScore >= 0 && this.totalScore < 5){
            divResultText.innerHTML = 'Маловато правильных ответов даже для человека ' +
                'с гуманитарным складом ума, ведь многие вопросы были общими.'
        }else if(this.totalScore >= 5 && this.totalScore < 9){
            divResultText.innerHTML = 'Не много, не мало. Нормальный результат для' +
                ' «гуманитария». Если вы считаете, ' +
                'что у вас всё же технический склад ума, значит вам просто попались не те вопросы.'
        }else{
            divResultText.innerHTML = 'Ух ты! Вот это результат! У вас точно технический склад ума' +
                ' – гуманитариям ответы на многие вопросы не известны, потому что попросту не интересны.'
        }
        divResultText.classList.add('resultHighlight');
        divResultText.style.marginBottom = '50' + 'px';
        divProgressText.after(divResultText);

        divYourQuestions.innerHTML = 'А какие интересные вопросы знаете вы?';
        divYourQuestions.style.color = 'grey';
        divYourQuestions.style.marginBottom = '50' + 'px';
        divResultText.after(divYourQuestions);

        divIcons.innerHTML = '<i class="fab fa-telegram-plane"></i> <i class="fab fa-vk"></i> ' +
            '<i class="fab fa-twitter"></i> <i class="fab fa-facebook-f"></i>';

        divYourQuestions.after(divIcons);
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

document.addEventListener('click', function (event) {
    if (event.target.dataset.click !== undefined ){
        let counter = Question.getCounter();
        if (event.target.innerHTML === questionsArray[counter].getCorrectAnswer()){
            let score = Question.getScore();
            Question.setScore(score + 1);
            console.log(score);
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