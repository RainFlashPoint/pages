const form = document.getElementById("graphql-form");
const queryInput = document.getElementById("query");
const resultDisplay = document.getElementById("result");

// 👇 修改为你的 Cloudflare Worker GraphQL URL
const GRAPHQL_ENDPOINT = "http://works.hengwei1104.workers.dev/graphql";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = queryInput.value;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        query: `query Chat($model: String!, $messages: [MessageInput!]!) {
            chat(model: $model, messages: $messages)
          }`,
        variables: {"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"今天天气怎么样"}]}
      })
  });

  const data = await res.json();
  resultDisplay.textContent = JSON.stringify(data, null, 2);
});
