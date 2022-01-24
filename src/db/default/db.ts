import {child, get, getDatabase, ref, update} from "firebase/database";

class Db implements IDb {

    getUserData() {
        const dbRef = ref(getDatabase());
        const path = sessionStorage.getItem('uid');
        if (!path) return
        return get(child(dbRef, `/${path}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        })
    }

    writeNewUser(uid: string, email: string, password: string):Promise<void> {
        const db = getDatabase();
        const user = {
            email,
            password
        };
        const updates: { [uid: string]: { email: string, password: string } } = {}
        updates[uid] = user;
        return update(ref(db), updates);
    }
}

export const db = new Db;