# ArchiveViewer
アーカイブされた書籍を閲覧することができます

## API仕様
- {}は任意変数です

### /archive/list
- アーカイブの一覧を取得

### /archive/search?word={TEXT}
- 指定したワードでアーカイブを検索

### /series/{SERIES_ID}/list
- 指定したシリーズIDの書籍一覧を取得

### /series/{SERIES_ID}/thumbnail
- 指定したシリーズIDのサムネイルを取得

### /series/{SERIES_ID}/search?word={TEXT}
- 指定したシリーズIDの書籍を指定したワードで検索

### /book/{BOOK_ID}/info
- 指定した書籍IDの情報を取得

### /book/{BOOK_ID}/thumbnail
- 指定した書籍IDのサムネイルを取得

### /book/{BOOK_ID}/page/{PAGE_NUM}
- 指定した書籍IDの指定したページ数の画像データを取得