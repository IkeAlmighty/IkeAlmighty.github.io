// A nodejs script for quickly creating the next chapter file

const fs = require("fs");

let highestChapNum = 0;

fs.readdirSync("chapters").forEach((filename) => {
  const chapNum = filename.replace(".md", "").trim();
  if (chapNum !== undefined) {
    if (chapNum > highestChapNum) {
      highestChapNum = chapNum;
    }
  }
});

const nextChaptNum = parseInt(highestChapNum) + 1;

const newFileName = `${nextChaptNum}.md`;

fs.appendFileSync(
  `./chapters/${newFileName}`,
  `## Chapter ${nextChaptNum}\n\n`
);
