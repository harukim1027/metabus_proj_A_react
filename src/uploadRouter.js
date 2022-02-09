const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//diskStorage 엔진으로 파일저장경로와 파일명을 세팅한다.
let storage = multer.diskStorage({
  //multer disk storage settings
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + '-' + Date.now() + extension);
  },
});

//특정 파일형식만 저장하기 위해서는 fileFilter함수를 사용한다.
const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== '.xlsx' &&
      ext !== '.pdf' &&
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.gif' &&
      ext !== '.jpeg'
    ) {
      return callback(
        new Error('Only .xlsx .pdf .png, .jpg .gif and .jpeg format allowed!'),
      );
    }
    callback(null, true);
  },
}).any(); //.any()는 전달받는 모든 파일을 받는다. 파일배열은 req.files에 저장되어 있다.

router.post('/files', (req, res, next) => {
  const reqFiles = [];
  try {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send({
          //에러발생하면, 에러 메시지와 빈 파일명 array를 return한다.
          message: err.message,
          files: reqFiles,
        });
      }

      for (var i = 0; i < req.files.length; i++) {
        //저장된 파일명을 차례로 push한다.
        reqFiles.push(req.files[i].filename);
      }

      res.status(200).send({
        //저장 성공 시, 저장성공 메시지와 저장된 파일명 array를 return한다.
        message: 'Uploaded the file successfully',
        files: reqFiles,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
      files: reqFiles,
    });
  }
});

module.exports = router;
