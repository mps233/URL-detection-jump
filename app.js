const urls = [
  "https://dash1.bocchi.ooo",
  "https://xb.bocchi.ooo",
  "https://cdn.bocchi.ooo"
];

let bestUrl = null;
let bestTime = Infinity;
let progress = 0;

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  progress += (100 / urls.length); // 每次更新的百分比
  progressBar.style.width = progress + "%"; // 更新进度条宽度
}

async function checkUrls() {
  for (let i = 0; i < urls.length; i++) {
    try {
      await fetch(urls[i]); // 发送请求
    } catch (error) {
      console.error("无法访问 URL: ", urls[i]);
    }
    updateProgressBar(); // 每次请求完成后更新进度条
  }
}

checkUrls();

async function checkUrlsLatency() {
  for (let i = 0; i < urls.length; i++) {
    const startTime = performance.now();
    try {
      await fetch(urls[i], { method: 'HEAD' });
      const latency = performance.now() - startTime;
      console.log(`${urls[i]} 响应时间: ${latency}ms`);

      if (latency < bestTime) {
        bestTime = latency;
        bestUrl = urls[i];
      }
    } catch (error) {
      console.error(`无法访问 ${urls[i]}:`, error);
    }
  }

  if (bestUrl) {
    console.log(`跳转到最快的 URL: ${bestUrl}`);
    window.location.href = bestUrl;
  } else {
    document.getElementById("message").textContent = "暂无线路可以访问，请联系管理员";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUrlsLatency();
});

function addToFavorites() {
  const url = window.location.href;
  const title = document.title;
  try {
    window.external.AddFavorite(url, title);
  } catch (err) {
    alert("按 Ctrl+D 添加到收藏夹");
  }
}


  
