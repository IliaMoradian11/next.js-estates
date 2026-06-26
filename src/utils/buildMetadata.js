export default function buildMetadata(profile, titlePlaceHolder) {
  const {
    titleMetadata: title,
    descriptionMetadata: description,
    authorMetadata: author,
    keyWordsMetadata: keywords,
  } = profile;

  return {
    title: `املاک | ${title || titlePlaceHolder}`,
    description,
    authors: { name: author },
    keywords: keywords.map((i) => i.text),
  };
}
