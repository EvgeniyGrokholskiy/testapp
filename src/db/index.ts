interface IDb {
    getUserData: () => void
    writeNewUser: (uid: string, email: string, password: string) => Promise<any>
}