document.getElementById('postForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const url = document.getElementById('siteUrl').value;
  const thumb = document.getElementById('thumbUrl').value;
  const video = document.getElementById('videoUrl').value;

  const newPost = {
    id: `post-${Date.now()}`,
    site: url.includes('fanza') ? 'FANZA' : 'MGS',
    url,
    thumb,
    video,
    title: "",
    tags: [],
    desc: "",
    status: "draft",
    updated_at: new Date().toISOString()
  };

  const res = await fetch('posts.json');
  const posts = await res.json();
  posts.push(newPost);

  const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' });
  const file = new File([blob], "posts.json");

  document.getElementById('result').textContent = 'ローカルで新規投稿を作成しました。この内容をGitHubにコミットしてください。';
});
