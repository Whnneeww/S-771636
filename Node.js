const express = require('express'); 
const multer = require('multer'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express(); 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) =&gt; { 
    cb(null, 'uploads/'); // ファイルを保存するディレクトリ 
  }, 
  filename: (req, file, cb) =&gt; { 
    cb(null, req.body.token + path.extname(file.originalname)); // トークンを含むファイル名 
  } 
}); 
const upload = multer({ storage: storage }); 
app.post('/upload', upload.single('file'), (req, res) =&gt; { 
  if (!req.file) { 
    return res.status(400).send('ファイルがありません。'); 
  } 
res.send('ファイルがアップロードされました。'); 
}); 
app.get('/:token', (req, res) =&gt; { 
  const token = req.params.token; 
  const filePath = path.join('uploads', token + path.extname(req.originalname)); 
if (fs.existsSync(filePath)) { 
    res.sendFile(filePath); 
  } else { 
    res.status(404).send('ファイルが見つかりません。'); 
  } 
}); 
app.listen(8443, () =&gt; { 
  console.log('サーバーがポート 8443 で起動しました。'); 
}); 
