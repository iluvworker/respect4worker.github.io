document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("loginId").value.trim();
  const pw = document.getElementById("loginPw").value.trim();

  try {
    // ✅ ここが重要。GitHub Pagesではルート相対パスにしないと404になる
    const res = await fetch("users.json");

    if (!res.ok) throw new Error("ユーザー情報を読み込めません。");
    const users = await res.json();

    // 入力チェック
    const user = users.find(u => u.id === id && u.pw === pw);

    if (user) {
      localStorage.setItem("loginUser", JSON.stringify(user));
      alert(`${user.name}さん、お稼ぎィ〜💸🎶！`);

      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "crew-dashboard.html";
      }
    } else {
      alert("IDまたはパスワードが違います。");
    }

  } catch (error) {
    console.error(error);
    alert("ユーザー情報を読み込めません。");
  }
});
