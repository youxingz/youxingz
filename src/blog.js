const axios = require("axios");

const HOST = "https://youxingz.com";

exports.render_blog = async () => {
  const resp = await axios.get(`${HOST}/search.json`);
  if (resp.status != 200) {
    throw Error(`Unexpected error: HTTP[${resp.status}]`);
  }
  const blogs = resp.data || [];
  // mapping
  const outputs = blogs
    .slice(0, 5)
    .map(blog => {
      const title = blog.title || "";
      const url = `${HOST}/${blog.path || ""}`;
      const { time, words } = blog.readingTime || {};
      let minutes = (time / 60000).toFixed(1).toString();
      if (minutes.endsWith(".0")) {
        minutes = minutes.substring(0, minutes.length - 2);
      }
      const created_at = (blog.date || "").substring(0, 10);
      return `* <a href="${url}" target="_blank">${title}</a> 【${created_at}】 \`📖${words} words\` \`🫣${minutes} mins\``;
    })
    .join("\n");

  // console.log(outputs)
  return outputs;
};

console.log(exports.render_blog());
