async function fetchChapterRange(first, last) {
  // this function attempts to fetch all the chapters within the specified
  // number range

  const chapters = {};

  for (let i = first; i <= last; i++) {
    let response = await fetch(`/chapters/CHAP${i}.md`);
    if (response.ok) chapters[i] = { text: await response.text() };
  }

  return chapters;
}

async function fetchChaptersUntil404() {
  const chapters = {};

  for (let i = 1; ; i++) {
    let response = await fetch(`/chapters/${i}.md`);
    if (response.ok) chapters[i] = { text: await response.text() };
    else return chapters;
  }
}

function getsubcontent(chapterNumber) {
  console.log(chapters[chapterNumber].text.split());
  const text = chapters[chapterNumber].text.split(
    new RegExp(new RegExp("Chapter [0-9]+"))
  )[1];
  return marked.parse(text || "no preview");
}

let chapters = {};
let latestChapter;

const MAX_CHAPTERS = 20;

window.onload = async () => {
  chapters = await fetchChaptersUntil404();
  latestChapter = Object.keys(chapters).length;

  const latestChapterPreview = createChapterPreviewEl(latestChapter);
  const latestChapterSection = document.getElementById(
    "latest-chapter-section"
  );
  latestChapterSection.appendChild(latestChapterPreview);

  // append all the chapter previews:
  for (let index = 1; index <= Object.keys(chapters).length; index++) {
    let preview = createChapterPreviewEl(index);
    document.getElementById("all-chapters-section").appendChild(preview);
  }
};

// component renderers:

function createChapterPreviewEl(chapterNumber) {
  const article = document.createElement("article");
  const header = document.createElement("header");
  const h3 = document.createElement("h3");
  const a = document.createElement("a");
  const p = document.createElement("p");

  a.innerHTML = `Chapter ${chapterNumber}`;
  a.setAttribute("href", `/chapters/md.${chapterNumber}`);

  p.innerHTML = getsubcontent(chapterNumber);

  article.appendChild(header);
  header.appendChild(h3);
  h3.appendChild(a);

  article.appendChild(p);

  return article;
}
