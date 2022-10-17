// acknowledgment of code adapted from https://www.twilio.com/blog/2016/11/a-simple-way-to-ocr-images-from-a-url-with-tesseract-js.html and
// https://www.geeksforgeeks.org/how-to-upload-single-multiple-image-to-cloudinary-using-node-js/  and
//https://www.youtube.com/watch?v=QhJiOCwz-_I
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const fs = require("fs");
const T = require("tesseract.js");

const sequelize = require("./config/connection");
// to enable cookie
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with helper methods
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//tesseract api config
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
  // Building success msg to display on screeny
  let response = "<h1>OCR Tool</h1><hr>";
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

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
