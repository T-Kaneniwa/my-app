const DB_NAME = 'commentDB';
const STORE_NAME = 'comments';
let db: IDBDatabase | null = null;

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      reject('データベースを開けませんでした');
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };
  });
}

export async function addComment(comment: any): Promise<void> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(comment);

    request.onsuccess = () => {
      resolve(console.log('コメントを投稿しました'));
    };

    request.onerror = () => {
      reject('コメントの保存に失敗しました');
    };
  });
}

export async function getComments(): Promise<any[]> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = () => {
      reject('コメントの取得に失敗しました');
    };
  });
}

//参考：IndexedDBの基本を学ぶ https://tech.iimon.co.jp/entry/2023/12/15/111146
