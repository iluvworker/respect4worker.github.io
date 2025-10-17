document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const mainContent = document.querySelector(".main-content");

  if (!sidebar || !toggleBtn) return;

  try {
    // ✅ 偽コンテナ作らず、既存asideに中身を流し込むだけ
    const res = await fetch("assets/sidebar.html", { cache: "no-cache" });
    const html = await res.text();
    sidebar.innerHTML = html;

    // ▼ デバイス判定
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // ▼ ローカルストレージで状態復元
    const sidebarState = localStorage.getItem("sidebarHidden");

    // ▼ モバイル時は強制的に閉じる、それ以外は保存状態を反映
    if (isMobile) {
      sidebar.classList.add("hidden");
      localStorage.setItem("sidebarHidden", "true");
    } else if (sidebarState === "true") {
      sidebar.classList.add("hidden");
    }

    // ▼ 初期位置を状態に合わせる
    if (mainContent) {
      mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "230px";
    }

    // ▼ モバイル表示の初期transform調整
    if (isMobile) {
      if (sidebar.classList.contains("hidden")) {
        sidebar.style.transform = "translateX(-220px)";
        toggleBtn.style.left = "10px";
      } else {
        sidebar.style.transform = "translateX(0)";
        toggleBtn.style.left = "230px";
      }
    }

    // ▼ 開閉ボタン挙動
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      const isHidden = sidebar.classList.contains("hidden");
      localStorage.setItem("sidebarHidden", isHidden);

      // メイン領域の連動
      if (mainContent) {
        mainContent.style.marginLeft = isHidden ? "0" : "230px";
      }

      // モバイル用transform＆位置修正
      if (window.innerWidth <= 768) {
        sidebar.style.transform = isHidden ? "translateX(-220px)" : "translateX(0)";
        toggleBtn.style.left = isHidden ? "10px" : "230px";
      } else {
        toggleBtn.style.left = isHidden ? "10px" : "230px";
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
