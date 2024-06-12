// import { render_wakatime } from './wakatime'
const { render_wakatime } = require("./wakatime");
const { render_blog } = require("./blog");

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  WAKATIME_API_KEY: wakatimeApiKey
} = process.env;

const main = async () => {
  const blogs = await render_blog();
  const wakatimes = await render_wakatime(gistId, githubToken, wakatimeApiKey);

  const outputs = `
#### 📰 Recent Posts

<!-- blog: https://youxingz.com starts -->
${blogs}
<!-- blog: https://youxingz.com ends -->


#### 👨‍💻 This Week I Code With

\`\`\`text
${wakatimes}
\`\`\`

  `;

  console.log(outputs);
};

(async () => {
  await main();
})();
