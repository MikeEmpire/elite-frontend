import S3 from "react-aws-s3";

const config = {
  bucketName: process.env.REACT_APP_S3_BUCKET,
  dirName: process.env.REACT_APP_S3_DIR_NAME,
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  s3Url: process.env.REACT_APP_S3_URL,
};
const ReactS3Client = new S3(config);

export default ReactS3Client;
