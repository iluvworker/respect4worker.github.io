document.addEventListener("DOMContentLoaded", async () => {
  // === サイドバーHTMLを読み込み ===
  const container = document.createElement("div");
  document.body.prepend(container);

  try {
    const res = await fetch("assets/sidebar.html");
    const html = await res.text();
    container.innerHTML = html;

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const mainContent = document.querySelector(".main-content");

    // ▼ ローカルストレージで状態復元
    const sidebarState = localStorage.getItem("sidebarHidden");
    if (sidebarState === "true") sidebar.classList.add("hidden");

    // ▼ 開閉ボタンの挙動
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      localStorage.setItem("sidebarHidden", sidebar.classList.contains("hidden"));

      // ▼ サイドバー開閉に合わせて右側連動
      if (mainContent) {
        if (sidebar.classList.contains("hidden")) {
          mainContent.style.marginLeft = "0";
        } else {
          mainContent.style.marginLeft = "230px";
        }
      }

      // ▼ モバイル対策（transform不具合修正）
      if (window.innerWidth <= 768) {
        sidebar.style.transform = sidebar.classList.contains("hidden")
          ? "translateX(-220px)"
          : "translateX(0)";
      }
    });

    // ▼ 初期位置をサイドバー状態に合わせる
    if (mainContent) {
      mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "230px";
    }

    // ▼ ユーザー名表示
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
