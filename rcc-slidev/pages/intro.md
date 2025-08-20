---
layout: section
---

# **バックエンドとは？**

---
hideInToc: true
---

# バックエンドの役割

<div class="h-4" />

<v-clicks>

- **データの管理**: データベースとの連携、データの保存・取得
- **ビジネスロジック**: アプリケーションの核となる処理
- **認証・認可**: ユーザーの身元確認とアクセス制御
- **API提供**: フロントエンドとの通信インターフェース
- **セキュリティ**: データ保護とセキュリティ対策

</v-clicks>

---
hideInToc: true
---

# フロントエンド vs バックエンド

<div class="h-4" />

<div class="grid grid-cols-2 gap-8">

<div>

<v-clicks>

### フロントエンド

- ユーザーが直接操作する部分
- HTML, CSS, JavaScript
- ブラウザ上で動作
- UI/UX の実装

</v-clicks>

</div>

<div>

<v-clicks>

### バックエンド

- ユーザーから見えない部分
- サーバーサイドの処理
- データベース操作
- API の提供

</v-clicks>

</div>

</div>

---
hideInToc: true
---

# バックエンドの技術スタック

<div class="h-4" />

<div class="grid grid-cols-2 gap-8">

<div class="flex flex-col gap-4">

<div>
                
<v-clicks>

### プログラミング言語

- **Node.js** (JavaScript/TypeScript)
- **Python** (Django, FastAPI)
- **Java** (Spring Boot)
- **Go**, **Rust**, **PHP** など

</v-clicks>

</div>

<div>

<v-clicks>

### データベース

- **リレーショナル**: MySQL, PostgreSQL, SQLite
- **NoSQL**: MongoDB, Redis

</v-clicks>

</div>

</div>

<div>

<v-clicks>

###  その他
- **Web フレームワーク**: Express.js, Hono
- **ORM**: Prisma, TypeORM, Drizzle
- **認証**: JWT, OAuth
- **API仕様**: OpenAPI
- **実行環境**: Docker, サーバーレス

</v-clicks>

</div>

</div>

---
layout: section
---

# 今回の学習内容

---
hideInToc: true
---

# 実装する機能

<v-clicks>

- **ユーザー名でのシンプルログイン**

- **ToDoの作成・読取・更新・削除**

  <span v-mark="{at: 2, color: 'red', type: 'underline' }"> (**CRUD**: **C**reate, **R**ead, **U**pdate, **D**elete) </span>

- **ユーザーごとのToDoリスト管理**

</v-clicks>

<v-click>

## 使用技術

</v-click>

<v-clicks>

- **Node.js + TypeScript**

- **Hono** (軽量なWebフレームワーク)

- **Drizzle ORM** (型安全なORM)

- **SQLite** (データベース)

</v-clicks>

---
hideInToc: true
---

# API設計の基本

<div class="h-4" />

<div class="flex flex-col gap-4">

<div>

<v-click>

### RESTful API

</v-click>

<v-clicks>

- **GET**: データ取得
- **POST**: データ作成
- **PUT/PATCH**: データ更新  
- **DELETE**: データ削除

</v-clicks>

</div>

<div>

<v-clicks>

### エンドポイント例

```
GET    /api/todos     # ToDoリスト取得
POST   /api/todos     # ToDo作成
PUT    /api/todos/:id # ToDo更新
DELETE /api/todos/:id # ToDo削除
```

```
GET    /api/users     # ユーザーの一覧を取得
POST   /api/users     # ユーザー登録
PUT    /api/users/:id # ユーザー更新
DELETE /api/users/:id # ユーザー削除
```

</v-clicks>

</div>

</div>

---
hideInToc: true
---

# データベース設計

<div class="h-4" />

<div class="grid grid-cols-2 gap-8">

<v-clicks>

<div>

### Usersテーブル
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);
```

</div>

<div>

### Todosテーブル  
```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0 NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

</div>

</v-clicks>

</div>

