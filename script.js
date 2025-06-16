let student = { name: "", email: "" };
let quizStarted = false;

const quizzes = {
    sinh: [
        {
            question: "Sinh vật nào là đơn bào?",
            options: ["Cá", "Vi khuẩn", "Con người", "Cây lúa"],
            answer: 1
        },
        {
            question: "Cấu trúc nào giúp tế bào tổng hợp protein?",
            options: ["Lysosome", "Ribosome", "Mitochondria", "Lục lạp"],
            answer: 1
        }
    ],
    ly: [
        {
            question: "Đơn vị của lực là gì?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            answer: 2
        },
        {
            question: "Vật rơi tự do do lực nào tác động?",
            options: ["Lực đẩy", "Lực hấp dẫn", "Ma sát", "Lực đàn hồi"],
            answer: 1
        }
    ],
    hoa: [
        {
            question: "Nguyên tử gồm những hạt nào?",
            options: ["Proton, Electron", "Electron, Quark", "Proton, Neutron, Electron", "Neutron, Ion"],
            answer: 2
        },
        {
            question: "Công thức hóa học của nước?",
            options: ["H2", "H2O", "HO2", "O2"],
            answer: 1
        }
    ]
};

// Đăng nhập
function login() {
    const name = document.getElementById("student-name").value.trim();
    const email = document.getElementById("student-email").value.trim();

    if (!name || !email) {
        alert("Vui lòng nhập đầy đủ họ tên và email.");
        return;
    }

    student.name = name;
    student.email = email;

    document.getElementById("login-container").style.display = "none";
    document.getElementById("subject-selector").style.display = "block";
}

// Load bài kiểm tra
function loadQuiz(subject) {
    quizStarted = true;
   document.addEventListener("visibilitychange", function () {
    if (quizStarted && document.visibilityState === "hidden") {
        alert("⚠️ Bạn đã rời khỏi màn hình! Vui lòng không chuyển tab khi làm bài.");
    }
});
    const container = document.getElementById("quiz-container");
    const quiz = quizzes[subject];
    if (!quiz) return;

    let html = `<h2>Bài kiểm tra môn ${subject.toUpperCase()}</h2><form id="quiz-form">`;

    quiz.forEach((q, idx) => {
        html += `<div class="question"><p>${idx + 1}. ${q.question}</p>`;
        q.options.forEach((opt, i) => {
            html += `<label><input type="radio" name="q${idx}" value="${i}"> ${opt}</label><br>`;
        });
        html += `</div>`;
    });

    html += `<button type="button" onclick="submitQuiz('${subject}')">Nộp bài</button></form><div id="result"></div>`;
    container.innerHTML = html;
}

// Nộp bài + gửi email
function submitQuiz(subject) {
    const quiz = quizzes[subject];
    const form = document.getElementById('quiz-form');
    let score = 0;

    quiz.forEach((q, idx) => {
        const answer = form[`q${idx}`]?.value;
        if (parseInt(answer) === q.answer) {
            score++;
        }
    });

    const result = document.getElementById('result');
    result.innerHTML = `<h3>Bạn được ${score}/${quiz.length} điểm.</h3>`;

    // Gửi email tới giáo viên
    const templateParams = {
        student_name: student.name,
        student_email: student.email,
        subject: subject.toUpperCase(),
        score: `${score}/${quiz.length}`
    };

    emailjs.send('service_yz65r6c_gmail', '__ejs-test-mail-service___score', templateParams)
        .then(function(response) {
            alert('✅ Kết quả đã được gửi tới giáo viên!');
        }, function(error) {
            console.error('❌ Lỗi khi gửi email:', error);
            alert('Gửi email thất bại. Vui lòng thử lại.');
        });
}
