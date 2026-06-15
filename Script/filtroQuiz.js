document.getElementById('quiz-filter').addEventListener('change', function() {
    var selectedQuiz = this.value;
    var quizzes = document.querySelectorAll('.col');
    quizzes.forEach(function(quiz) {
        if (selectedQuiz === 'all') {
            quiz.style.display = 'block';
        } else if (quiz.id === selectedQuiz) {
            quiz.style.display = 'block';
        } else {
            quiz.style.display = 'none';
        }
    });
});