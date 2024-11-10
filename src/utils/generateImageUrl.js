// fileName: wdding_01
// format: jpg | webp
// option: c_fill, w_400
const generateImageUrl = ({ fileName, format, option = 'q_auto,c_fill', }) => {
    return `https://res.cloudinary.com/dxq8lly54/image/upload/${option}/${fileName}.${format}`;
};
export default generateImageUrl;
