import chai from "chai";
import {it} from "mocha";
const expect = chai.expect;
import {sum} from "../../../src/sum"


describe("Sum two numbers", function () {
    it("function must be define", ()=>{
        expect(sum).not.undefined
    })

    it("should return 2 when a = 1 , b = 1", function () {
        const res = sum(1,1);
        expect(res).to.equal(2)
    });
});