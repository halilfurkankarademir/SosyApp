import Resizer from "react-image-file-resizer";

const resizeImage = (file, width, height) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            "WEBP",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export default resizeImage;
