# ArchiveViewer
- アーカイブされた書籍を閲覧することができます

## 構成
- 以下の構造をアーカイブとして設定できます
<pre>
archive/
├── title1/
│   └── subtitle/
│       ├── 123.zip
│       ├── 456.zip
│       └── 789.zip
└── title2/
    ├── 123.zip
    ├── 456.cbz
    └── 789.cbz
</pre>

## API仕様
- {}は任意変数です

### [GET] /archive/list
- アーカイブの一覧を取得

### [GET] /archive/search?word={TEXT}
- 指定したワードでアーカイブを検索

### [GET] /series/{SERIES_ID}/list
- 指定したシリーズIDの書籍一覧を取得

### [GET] /series/{SERIES_ID}/thumbnail
- 指定したシリーズIDのサムネイルを取得

### [GET] /series/{SERIES_ID}/search?word={TEXT}
- 指定したシリーズIDの書籍を指定したワードで検索

### [GET] /book/{BOOK_ID}/info
- 指定した書籍IDの情報を取得

### [GET] /book/{BOOK_ID}/thumbnail
- 指定した書籍IDのサムネイルを取得

### [GET] /book/{BOOK_ID}/page/{PAGE_NUM}
- 指定した書籍IDの指定したページ数の画像データを取得

### [DELETE] /cache
- 全てのキャッシュを削除します
- この操作はAPIキーの使用が有効である必要があります