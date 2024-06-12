const { render_wakatime } = require("./wakatime");
const { render_blog } = require("./blog");
const fs = require("node:fs");

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  WAKATIME_API_KEY: wakatimeApiKey
} = process.env;

const main = async () => {
  const blogs = await render_blog();
  const wakatimes = await render_wakatime(gistId, githubToken, wakatimeApiKey);

  const outputs = `
### Hi there 👋

Here is my blog:
[www.mathjoker.com](https://www.mathjoker.com)

#### 📰 Recent Posts

<!-- blog: https://youxingz.com starts -->
${blogs}
<!-- blog: https://youxingz.com ends -->


#### 👨‍💻 This Week I Code With

\`\`\`text
${wakatimes}
\`\`\`


#### 🔭 Summary

[![](https://raw.githubusercontent.com/youxingz/youxingz/main/profile-summary-card-output/default/0-profile-details.svg)](https://github.com/youxingz)
[![](https://raw.githubusercontent.com/youxingz/youxingz/main/profile-summary-card-output/default/1-repos-per-language.svg)](https://github.com/youxingz) 
[![](https://raw.githubusercontent.com/youxingz/youxingz/main/profile-summary-card-output/default/2-most-commit-language.svg)](https://github.com/youxingz)
[![](https://raw.githubusercontent.com/youxingz/youxingz/main/profile-summary-card-output/default/3-stats.svg)](https://github.com/youxingz)
[![](https://raw.githubusercontent.com/youxingz/youxingz/main/profile-summary-card-output/default/4-productive-time.svg)](https://github.com/youxingz)

[![](https://raw.githubusercontent.com/youxingz/youxingz/main/github-metrics.svg)](https://github.com/youxingz)
  `;

  console.log(outputs);

  fs.writeFileSync("./README.md", outputs); // error may be throw.
};

(async () => {
  await main();
})();
