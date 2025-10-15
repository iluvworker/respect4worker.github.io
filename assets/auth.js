document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("loginId").value.trim();
  const pw = document.getElementById("loginPw").value.trim();

  try {
    // JSONファイルを取得
    const res = await fetch("../users.json");
    if (!res.ok) throw new Error("ユーザー情報を読み込めません。");
    const users = await res.json();

    // 入力されたIDとPWで一致するユーザーを探す
    const user = users.find(u => u.id === id && u.pw === pw);

    if (user) {
      // ログイン成功
      localStorage.setItem("loginUser", JSON.stringify(user));
      alert(`${user.name}さん、ようこそ！`);

      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "worker.html";
      }
    } else {
      alert("IDまたはパスワードが違います。");
    }

  } catch (error) {
    console.error(error);
    alert("ユーザー情報を読み込めません。");
  }
});
