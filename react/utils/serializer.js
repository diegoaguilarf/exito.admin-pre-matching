export const documentsSerializer = (documents) => {
  if (documents) {
    return documents.map(doc => {
      let newObject = {};
      doc.fields.forEach((item) => {
        newObject[item.key] = item.value;
      })
      return newObject
    });
  }
  return null;
}