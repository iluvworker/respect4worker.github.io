// サイドバーを全ページに読み込む
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.createElement("div");
  document.body.prepend(container);
  
  const res = await fetch("assets/sidebar.html");
  const html = await res.text();
  container.innerHTML = html;

  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });
});
