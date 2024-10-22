const convertToSerializableObject = (leanDocument) => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  // leanDocument['ingredients'].map((obj) => {
  //   for (const key of Object.keys(obj)) {
  //     if (obj[key].toJSON && obj[key].toString) {
  //       obj[key] = obj[key].toString();
  //     }
  //   }
  // });

  // leanDocument['instructions'].map((obj) => {
  //   for (const key of Object.keys(obj)) {
  //     if (obj[key].toJSON && obj[key].toString) {
  //       obj[key] = obj[key].toString();
  //     }
  //   }
  // });

  return leanDocument;
};

export default convertToSerializableObject;
