<head><script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script></head>

async function login(userId, userPw) {
  const res = await fetch('users.json');
  const users = await res.json();
  const hash = md5(userPw);
  const user = users.find(u => u.id === userId && u.pw === hash);

  if (!user) {
    document.getElementById('loginMessage').textContent = 'IDまたはパスワードが違います。';
    return;
  }

  localStorage.setItem('user', JSON.stringify(user));
  if (user.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'worker.html';
  }
}

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('userId').value.trim();
  const pw = document.getElementById('userPw').value.trim();
  login(id, pw);
});

// MD5（軽量暗号化）
function md5(str){
  return CryptoJS.MD5(str).toString();
}
