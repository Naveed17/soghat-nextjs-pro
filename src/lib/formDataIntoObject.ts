function formDataToObject(
  formData: FormData
): Record<string, string | string[] | File | File[]> {
  const obj: Record<string, string | string[] | File | File[]> = {};

  formData.forEach((value, key) => {
    // Check if the key already exists in the object
    if (obj[key]) {
      // If the existing value is a string and new value is a string, put them in an array
      if (typeof obj[key] === "string" && typeof value === "string") {
        obj[key] = [obj[key] as string, value];
      }
      // If the existing value is a File and new value is a File, put them in an array
      else if (obj[key] instanceof File && value instanceof File) {
        obj[key] = [obj[key] as File, value];
      }
      // If the existing value is an array of strings and new value is a string, push it into the array
      else if (Array.isArray(obj[key]) && typeof value === "string") {
        (obj[key] as string[]).push(value);
      }
      // If the existing value is an array of files and new value is a File, push it into the array
      else if (Array.isArray(obj[key]) && value instanceof File) {
        (obj[key] as File[]).push(value);
      }
    } else {
      // If it's the first occurrence of this key, just add the value
      obj[key] = value;
    }
  });

  return obj;
}
export default formDataToObject;
