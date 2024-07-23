const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.token + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('ファイルがありません。');
    }
    res.send('ファイルがアップロードされました。');
});

app.get('/:token', (req, res) => {
    const token = req.params.token;
    const filePath = path.join(uploadDir, token + path.extname(req.body.fileName)); // req.body.fileNameにて元のファイル名を取得する必要があります。

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('ファイルが見つかりません。');
    }
});

app.listen(8443, () => {
    console.log('サーバーがポート 8443 で起動しました。');
});
