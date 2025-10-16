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

  // サイドバーの状態を記憶（true = 隠れてる）
  localStorage.setItem("sidebarHidden", sidebar.classList.contains("hidden"));
  
  // モバイルでも強制的にリフレッシュ（transformが効かない対策）
  if (window.innerWidth <= 768) {
    if (sidebar.classList.contains("hidden")) {
      sidebar.style.transform = "translateX(-220px)";
    } else {
      sidebar.style.transform = "translateX(0)";
    }
  }
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

// ===== サイドバー連動で右側を動かす =====
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const mainContent = document.querySelector(".main-content");

  if (toggleBtn && sidebar && mainContent) {
    toggleBtn.addEventListener("click", () => {
      if (sidebar.classList.contains("hidden")) {
        mainContent.style.marginLeft = "0";
      } else {
        mainContent.style.marginLeft = "230px"; // ← サイドバー幅に合わせて調整
      }
    });
  }
});
// ===== メインコンテンツの margin をサイドバーと連動 =====
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");

  if (!sidebar || !mainContent) return;

  // 初期状態を同期
  if (sidebar.classList.contains("hidden")) {
    mainContent.style.marginLeft = "0";
  } else {
    mainContent.style.marginLeft = "230px";
  }

  // 開閉ボタンの挙動に合わせて追従
  const toggleBtn = document.getElementById("toggleSidebar");
  toggleBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("hidden")) {
      mainContent.style.marginLeft = "0";
    } else {
      mainContent.style.marginLeft = "230px";
    }
  });
});
