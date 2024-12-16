document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("signupModal");
  const openBtn = document.getElementById("myBtn");
  const closeBtn = document.querySelector(".close");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const message = document.getElementById("passwordMatchMessage");
  const signupButton = document.querySelector(".signup-button");
  const signupForm = document.querySelector(".signup-form"); // 폼 요소 추가

  // 팝업 열기
  openBtn.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
    modal.style.display = "block";
  });

  // 팝업 닫기
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 팝업 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 비밀번호 일치 여부 확인 함수
  const checkPasswordMatch = () => {
    const pw1 = ppassword.value.trim();
    const pw2 = confirmPassword.value.trim();

    if (pw1 && pw1 === pw2) {
      updateMessage("Passwords match!", "green");
      signupButton.disabled = false; // 버튼 활성화
    } else if (pw2) {
      updateMessage("Passwords do not match!", "red");
      signupButton.disabled = true; // 버튼 비활성화
    } else {
      updateMessage("", ""); // 메시지 초기화
      signupButton.disabled = true; // 버튼 비활성화
    }
  };

  const updateMessage = (text, color) => {
    message.textContent = text;
    message.style.color = color;
    message.style.display = text ? "inline-block" : "none"; //일치 불일치 판별 후 색깔 구분해서 출력
  };

  password.addEventListener("input", checkPasswordMatch);
  confirmPassword.addEventListener("input", checkPasswordMatch);

  // 폼 제출 시 비밀번호 일치 여부 확인
  signupForm.addEventListener("submit", (event) => {
    const pw1 = ppassword.value.trim();
    const pw2 = confirmPassword.value.trim();

    if (pw1 !== pw2) {
      updateMessage("Passwords do not match!", "red");
      event.preventDefault(); // 폼 제출 방지
    }
  });
});
