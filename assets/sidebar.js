document.addEventListener("DOMContentLoaded", async () => {
  const container = document.createElement("div");
  document.body.prepend(container);

  try {
    // ▼ ロール判定
    const user = JSON.parse(localStorage.getItem("loginUser"));
    const role = user?.role || "guest";

    // ▼ 読み込むサイドバーHTMLを分岐
    const sidebarFile = role === "crew"
      ? "assets/sidebar-crew.html"
      : "assets/sidebar.html";

    const res = await fetch(sidebarFile);
    const html = await res.text();
    container.innerHTML = html;

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const mainContent = document.querySelector(".main-content");
    if (!sidebar || !toggleBtn) return;

    // ▼ デバイス判定
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const sidebarState = localStorage.getItem("sidebarHidden");

    if (isMobile) {
      sidebar.classList.add("hidden");
      localStorage.setItem("sidebarHidden", "true");
    } else if (sidebarState === "true") {
      sidebar.classList.add("hidden");
    }

    if (mainContent) {
      mainContent.style.marginLeft = sidebar.classList.contains("hidden") ? "0" : "230px";
    }

    if (isMobile) {
      if (sidebar.classList.contains("hidden")) {
        sidebar.style.transform = "translateX(-220px)";
        toggleBtn.style.left = "10px";
      } else {
        sidebar.style.transform = "translateX(0)";
        toggleBtn.style.left = "230px";
      }
    }

    // ▼ 開閉トグル
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      const isHidden = sidebar.classList.contains("hidden");
      localStorage.setItem("sidebarHidden", isHidden);
      if (mainContent)
        mainContent.style.marginLeft = isHidden ? "0" : "230px";
      if (window.innerWidth <= 768) {
        sidebar.style.transform = isHidden ? "translateX(-220px)" : "translateX(0)";
        toggleBtn.style.left = isHidden ? "10px" : "230px";
      }
    });

    // ▼ ユーザー名表示
    if (user?.name) {
      const nameBox = document.createElement("div");
      nameBox.className = "username";
      nameBox.textContent = `👤 ${user.name}（${role === "crew" ? "クルー" : "管理者"}）`;
      sidebar.appendChild(nameBox);
    }

  } catch (err) {
    console.error("サイドバー読み込みエラー:", err);
  }
});
