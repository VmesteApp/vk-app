const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "bmp"];

export const isImage = (file: File): boolean => {
  const extension = file.name.split(".").pop()?.toLowerCase();

  console.log(extension)
  return extension?.length ? IMAGE_EXTENSIONS.includes(extension) : false;
};
