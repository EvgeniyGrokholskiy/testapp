import {expect} from "chai";
import AuthDefault from "../../../src/auth/default/auth";
import {firebaseconfig} from "../../../src/firebaseconfig";
import {getAuth} from "firebase/auth";

const auth = new AuthDefault(firebaseconfig)
const newEmail = "grokholskiy@gmail.com"
const email = "123456789@74.ru"
const password = "123456789"

describe("Authentication class for Firebase authentication", () => {


    it("class must be define", () => {
        expect(auth).not.be.undefined
    });

    it("class must have own methods", () => {
        expect(auth).has.property("logIn");
        expect(auth).has.property("logOut");
        expect(auth).has.property("signUp");
    });

    it("logIn promise is resolved and return right object", async () => {
        const logInResult = await auth.logIn(email, password);
        expect(logInResult.user).not.be.undefined;
        expect(logInResult.user.email).not.be.undefined;
        expect(logInResult.user.email).is.a('string');
        expect(logInResult.user.email).to.eq(email);
        expect(logInResult.user.uid).not.be.undefined;
        expect(logInResult.user.uid).is.a('string');
    });

    it("signUp promise is resolved and return right object", async () => {
        const signUpResult = await auth.signUp(newEmail, password);
        await auth.logOut();
        expect(signUpResult.user).not.be.undefined;
        expect(signUpResult.user.email).not.be.undefined;
        expect(signUpResult.user.email).is.a('string');
        expect(signUpResult.user.email).to.eq(newEmail);
        expect(signUpResult.user.uid).not.be.undefined;
        expect(signUpResult.user.uid).is.a('string');
    });

    it("logOut promise is resolved", async () => {
        const logoutData = await auth.logOut().then(() => true)
        expect(logoutData).is.true
    });
})