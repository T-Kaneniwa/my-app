import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const DB_NAME = 'commentDB';
export const STORE_NAME_COMMENTS = 'comments' as const;
let db: IDBDatabase | null = null;

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      reject('データベースを開けませんでした');
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    /** commentsテーブルが存在しなかったら新規作成 */
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME_COMMENTS)) {
        db.createObjectStore(STORE_NAME_COMMENTS, {
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
    const transaction = database.transaction(STORE_NAME_COMMENTS, 'readwrite');
    const store = transaction.objectStore(STORE_NAME_COMMENTS);
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
    const transaction = database.transaction(STORE_NAME_COMMENTS, 'readonly');
    const store = transaction.objectStore(STORE_NAME_COMMENTS);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject('コメントの取得に失敗しました');
    };
  });
}

export async function deleteComment(id: number): Promise<void> {
  const isConfirmed = confirm('投稿内容を削除しますか?');
  if (!isConfirmed) {
    return;
  }
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    // トランザクションとオブジェクトストアの取得
    const transaction = db.transaction(STORE_NAME_COMMENTS, 'readwrite');
    const store = transaction.objectStore(STORE_NAME_COMMENTS);

    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => {
      resolve(alert('投稿内容を削除しました。'));
    };

    deleteRequest.onerror = () => {
      reject('投稿内容の削除に失敗しました');
    };
  });
}

export const handleAccount = () => {
  createUserWithEmailAndPassword(auth, 'test@test.jp', 'testtest');
  // auth.createUserWithEmailAndPassword('test@test.jp', 'test');
  alert('登録しました');
};

//参考：IndexedDBの基本を学ぶ https://tech.iimon.co.jp/entry/2023/12/15/111146
