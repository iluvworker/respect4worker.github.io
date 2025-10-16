document.addEventListener("DOMContentLoaded", async () => {
  // sidebar.html を読み込み
  const container = document.createElement("div");
  document.body.prepend(container);

  try {
    const res = await fetch("assets/sidebar.html");
    const html = await res.text();
    container.innerHTML = html;

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");

    // ▼ ローカルストレージにサイドバーの状態を保持
    const sidebarState = localStorage.getItem("sidebarHidden");
    if (sidebarState === "true") {
      sidebar.classList.add("hidden");
    }

    // ▼ 開閉ボタン挙動
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      localStorage.setItem("sidebarHidden", sidebar.classList.contains("hidden"));
    });

    // ▼ ユーザー名を保持して表示
    const username = localStorage.getItem("userName");
    if (username) {
      const nameBox = document.createElement("div");
      nameBox.className = "username";
      nameBox.textContent = `👤 ${username}`;
      sidebar.appendChild(nameBox);
    }
  } catch (error) {
    console.error("サイドバー読み込みエラー:", error);
  }
});
