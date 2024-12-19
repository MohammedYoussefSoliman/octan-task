function formDataHandler(formData: { [key: string]: any }) {
  const payload = new FormData();

  Object.keys(formData).forEach((k) => {
    if (formData[k] !== undefined) {
      payload.append(k, formData[k]);
    }
  });

  return payload;
}

export default formDataHandler;
