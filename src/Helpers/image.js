import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      248,
      248,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri || undefined);
      },
      "file"
    );
  });

// convert a blob to base64
const blobToBase64 = async (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  });

const getImageBlob = async (url) =>
  new Promise(async (resolve) => {
    const resposne = await fetch(url);
    const blob = resposne.blob();
    resolve(blob);
  });

// combine the previous two functions to return a base64 encode image from url
export const getBase64Image = async (file) => {
  const resizedImg = await resizeFile(file);
  const blob = await getImageBlob(resizedImg);
  const base64 = await blobToBase64(blob);
  return base64;
};

const handleImg = async (photo) => {
  try {
    const resizedImg = await resizeFile(photo);
    // console.log({ resizedImg });
    //   const urls = await fetchRequestFileUpload({
    //     input: {
    //       amount: 1,
    //       type: 'jpeg',
    //     },
    //   });
    //   // console.log({ urlsB: urls });
    //   await fetch(urls[0], {
    //     method: 'PUT',
    //     body: resizedImg,
    //     redirect: 'follow',
    //     headers: {
    //       'Content-Type': 'image/jpeg',
    //     },
    //   });
    //   // console.log({ urlsA: urls });
    //   const avatarLink = await handleUpdateAvatar({ avatarPath: urls[0] });
    //   // console.log({ avatarLink });
    const base64 = await getBase64Image(avatarLink);
    // console.log({ base64 });
    return base64;
  } catch (error) {
    throw error;
  }
};
