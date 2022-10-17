// Requiring module
const express = require("express");
const multer = require("multer");
const port = 3000;
const app = express();
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const fs = require("fs");
const T = require("tesseract.js");

// Creating uploads folder if not already present
// In "uploads" folder we will temporarily upload
// image before uploading to cloudinary
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// Cloudinary configuration
cloudinary.config({
  cloud_name: "djkf82kzz",
  api_key: "493749513512594",
  api_secret: "-QC6DoQ7ej7DVCbL7V_CgMrgWm8",
});

async function uploadToCloudinary(locaFilePath, localFileName) {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  const mainFolderName = "main";
  const subFolderName = "uploads";
  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary
  const index = localFileName.indexOf(".");
  const newLocalFileName = localFileName.substr(0, index);
  console.log("newLocalFileName " + newLocalFileName);
  const filePathOnCloudinary =
    mainFolderName + "/" + subFolderName + "/" + newLocalFileName;
  console.log("filePathOnCloudinary is " + filePathOnCloudinary);

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on
      // cloudinary So we dont need local image
      // file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
}

async function buildSuccessMsg(urlList) {
  // Building success msg to display on screen
  let response = `<h1>
                   <a href="/">Click to go to Home page</a><br>
                  </h1><hr>`;
  let ocrImageText = [];

  // Iterating over urls of images and creating basic
  // html to render images on screen
  for (let i = 0; i < urlList.length; i++) {
    console.log("URL " + urlList[i]);

    const out = await T.recognize(urlList[i], "eng", {});
    ocrImageText[i] = out.data.text;
    console.log(ocrImageText[i]);

    response += "File uploaded successfully.<br><br>";
    response += `FILE URL: <a href="${urlList[i]}">
                    ${urlList[i]}</a>.<br><br>`;
    response += `<img src="${urlList[i]}" /><br><hr>`;
    response += `<p>${ocrImageText}</p><br><br>`;
  }

  response += `<br>
<p>Now you can store this url in database or 
  // do anything with it  based on use case.</p>
`;
  return response;
}

app.post(
  "/profile-upload-single",
  upload.single("profile-file"),
  async (req, res, next) => {
    // req.file is the `profile-file` file
    // req.body will hold the text fields,
    // if there were any

    console.log("body", req.body);

    // req.file.path will have path of image
    // stored in uploads folder
    const localFilePath = req.file.path;
    const localFileName = req.file.filename;
    console.log("logcalFilePath is " + localFilePath);
    // console.log(res.request.file.originalname);

    // Upload the local image to Cloudinary
    // and get image url as response
    const result = await uploadToCloudinary(localFilePath, localFileName);

    console.log("result: ", result);

    // Generate html to display images on web page.
    const response = await buildSuccessMsg([result.url]);

    return res.send(response);
  }
);

app.post(
  "/profile-upload-multiple",
  upload.array("profile-files", 12),
  async (req, res, next) => {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields,
    // if there were any
    const imageUrlList = [];

    for (let i = 0; i < req.files.length; i++) {
      const locaFilePath = req.files[i].path;

      // Upload the local image to Cloudinary
      // and get image url as response
      const result = await uploadToCloudinary(locaFilePath);
      imageUrlList.push(result.url);
    }

    const response = buildSuccessMsg(imageUrlList);

    return res.send(response);
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}!
            \nClick http://localhost:3000/`);
});
