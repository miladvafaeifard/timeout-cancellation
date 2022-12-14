let requestCancellation;
let timeoutHandle;

const [postsList] = document.getElementsByClassName("posts-list");

async function timeout(delay, signal) {
  return new Promise((resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      requestCancellation.abort();
      throw new Error(`Request aborted as it took longer than ${delay}ms`);
    }, delay);

    signal?.addEventListener("abort", (e) => {
      clearTimeout(timeoutHandle);
      reject(new Error("Aborted"));
    });
  });
}

async function makeRequest(url) {
  requestCancellation = new AbortController();
  try {
    const response = await fetch(url, { signal: requestCancellation.signal });
    return await response.json();
  } finally {
    clearTimeout(timeoutHandle);
  }
}

async function loadPosts() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const postsData = await Promise.race([
    makeRequest(url),
    timeout(2000, requestCancellation.signal),
  ]);

  postsData.forEach((post) => {
    const article = document.createElement("article");
    const header = document.createElement("h2");
    const paragraph = document.createElement("p");
    const bodyText = document.createTextNode(post.body);
    const titleText = document.createTextNode(post.title);
    paragraph.appendChild(bodyText);
    header.appendChild(titleText);
    article.appendChild(header);
    article.appendChild(paragraph);
    postsList.appendChild(article);
  });

  if(!requestCancellation.signal.aborted) {
    requestCancellation.signal?.removeEventListener("abort", () => {});
  }

}

function cancel() {
  requestCancellation.abort();
}

function reset() {
  postsList.innerHTML = '';
}
