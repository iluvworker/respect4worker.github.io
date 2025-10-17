document.addEventListener("DOMContentLoaded", async () => {
  try {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const mainContent = document.querySelector(".main-content");

    if (!sidebar || !toggleBtn || !mainContent) {
      console.warn("sidebar.js: 要素が見つかりません");
      return;
    }

    // ✅ sidebar.html 読み込み（キャッシュ無効）
    const res = await fetch("assets/sidebar.html", { cache: "no-cache" });
    sidebar.innerHTML = await res.text();

    // ▼ 状態初期化
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const savedState = localStorage.getItem("sidebarHidden");
    const shouldHide = isMobile || savedState === "true";

    sidebar.classList.toggle("hidden", shouldHide);
    mainContent.style.marginLeft = shouldHide ? "0" : "230px";
    toggleBtn.style.left = shouldHide ? "10px" : "230px";

    // ▼ ボタンクリック挙動
    toggleBtn.addEventListener("click", () => {
      const hidden = sidebar.classList.toggle("hidden");
      localStorage.setItem("sidebarHidden", hidden);
      mainContent.style.marginLeft = hidden ? "0" : "230px";
      toggleBtn.style.left = hidden ? "10px" : "230px";
    });

    // ▼ ユーザー名表示（sidebar.htmlの下部に挿入）
    const username = localStorage.getItem("userName");
    if (username && !sidebar.querySelector(".username")) {
      const nameBox = document.createElement("div");
      nameBox.className = "username";
      nameBox.textContent = `👤 ${username}`;
      sidebar.appendChild(nameBox);
    }
  } catch (err) {
    console.error("サイドバー読み込みエラー:", err);
  }
});
