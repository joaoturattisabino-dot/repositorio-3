// Banco de dados de perguntas do quiz
const questions = [
    {
        question: "O que significa a sigla HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Management Line",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Qual propriedade CSS é usada para alterar a cor do texto?",
        options: [
            "text-color",
            "background-color",
            "color",
            "font-style"
        ],
        correct: 2
    },
    {
        question: "Como declaramos uma variável que NÃO pode ser alterada em JavaScript?",
        options: [
            "let",
            "var",
            "const",
            "static"
        ],
        correct: 2
    },
    {
        question: "Qual tag HTML é usada para incluir um arquivo JavaScript externo?",
        options: [
            "<script>",
            "<js>",
            "<javascript>",
            "<link>"
        ],
        correct: 0
    },
    {
        question: "O que o comando 'console.log()' faz?",
        options: [
            "Cria uma janela de alerta na tela",
            "Exibe uma mensagem no console do desenvolvedor",
            "Salva dados no banco de dados",
            "Fecha a aba do navegador"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Elementos da Interface
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress");
const finalScoreDisplay = document.getElementById("final-score");
const feedbackText = document.getElementById("feedback-text");

// Eventos de início e reinício
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    startScreen.classList.remove("active");
    endScreen.classList.remove("active");
    gameScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    resetTimer();
    
    // Atualizar barra de progresso
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Carregar pergunta atual
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    // Criar botões das alternativas
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectWrong(); // Perdeu o tempo, avança como errado
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
}

function selectOption(selectedIndex) {
    resetTimer();
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    // Desabilitar todos os botões para evitar cliques múltiplos
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        buttons[selectedIndex].classList.add("correct");
        score += 20; // 20 pontos por acerto (máximo 100)
        scoreDisplay.textContent = score;
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[currentQuestion.correct].classList.add("correct"); // Mostra a certa
    }

    // Espera 1.5 segundos para o usuário ver o feedback antes de mudar de pergunta
    setTimeout(nextQuestion, 1500);
}

function autoSelectWrong() {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    buttons[currentQuestion.correct].classList.add("correct"); // Mostra a resposta certa
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    gameScreen.classList.remove("active");
    endScreen.classList.add("active");
    progressBar.style.width = "100%";
    finalScoreDisplay.textContent = score;

    // Mensagem customizada dependendo do desempenho
    if (score === 100) {
        feedbackText.textContent = "Excelente! Você gabaritou o quiz e tem nível de monitor sênior! 🚀";
    } else if (score >= 60) {
        feedbackText.textContent = "Muito bom! Você conhece bem os conceitos básicos. 👍";
    } else {
        feedbackText.textContent = "Bons pontos! Que tal revisar esses conceitos com a nossa equipe? 📚";
    }
}
