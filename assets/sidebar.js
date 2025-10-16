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

    if (!sidebar || !toggleBtn) return;

  // ▼ ローカルストレージで状態復元
const sidebarState = localStorage.getItem("sidebarHidden");
if (sidebarState === "true") sidebar.classList.add("hidden");

// ▼ モバイル時は初期状態で閉じる ←★ここを追加！
const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (isMobile) {
  sidebar.classList.add("hidden");
  localStorage.setItem("sidebarHidden", "true");
}
    // ▼ 初期位置を状態に合わせる
    if (mainContent) {
      mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "230px";
    }

    // ▼ ページ読み込み時のモバイル位置初期化
    const isHidden = sidebar.classList.contains("hidden");
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (isHidden) {
        sidebar.style.transform = "translateX(-220px)";
        toggleBtn.style.left = "10px"; // 左端
      } else {
        sidebar.style.transform = "translateX(0)";
        toggleBtn.style.left = "230px"; // サイドバー右端
      }
    }

    // ▼ 開閉ボタン挙動（唯一のイベント）
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      localStorage.setItem("sidebarHidden", sidebar.classList.contains("hidden"));

      // サイドバー開閉に合わせて右側連動
      if (mainContent) {
        mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "230px";
      }

      // モバイル用のtransform＆位置修正
      if (window.innerWidth <= 768) {
        if (sidebar.classList.contains("hidden")) {
          sidebar.style.transform = "translateX(-220px)";
          toggleBtn.style.left = "10px";
        } else {
          sidebar.style.transform = "translateX(0)";
          toggleBtn.style.left = "230px";
        }
      }
    });

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
