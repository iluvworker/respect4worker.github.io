// === ログイン処理 ===
async function login(event) {
  event.preventDefault();

  const userId = document.getElementById("loginId").value.trim();
  const userPw = document.getElementById("loginPw").value.trim();

  if (!userId || !userPw) {
    alert("IDとパスワードを入力してください。");
    return;
  }

  try {
    // ✅ users.jsonの場所（assetsフォルダの1階層上）
    const res = await fetch("../users.json");
    const users = await res.json();

    // ✅ 入力されたパスワードをMD5化して照合
    const hash = CryptoJS.MD5(userPw).toString();
    const user = users.find(u => u.id === userId && u.pw === hash);

    if (user) {
      localStorage.setItem("loginUser", JSON.stringify(user));
      alert(`${user.name}さん、お稼ぎ〜っ💸`);

      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "worker.html";
      }
    } else {
      alert("IDまたはパスワードが違います。");
    }

  } catch (err) {
    console.error("ログイン処理中にエラー:", err);
    alert("ユーザー情報を読み込めません。");
  }
}

// === ログインフォームにイベントを紐付け ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) form.addEventListener("submit", login);
});
