import {expect} from "chai";
import AuthDefault from "../../../src/auth/default/auth";
import {firebaseconfig} from "../../../src/firebaseconfig";

const auth = new AuthDefault(firebaseconfig)

describe ("Authentication class for Firebase authentication", () => {

    it("class must be define", () => {
        expect(auth).not.be.undefined
    });
    it ("class must have own methods", () => {
        expect(auth).has.property("logIn");
        expect(auth).has.property("logOut");
        expect(auth).has.property("signUp");
    });
})