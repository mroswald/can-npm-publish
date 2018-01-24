const path = require("path");
const assert = require("assert");
const canNpmPublish = require("../lib/can-npm-publish").canNpmPublish;

const shouldNotCalled = () => {
    throw new Error("SHOULD NOT CALLED");
};
describe("can-npm-publish", () => {
    it("should be rejected, it is private:true", () => {
        return canNpmPublish(path.join(__dirname, "fixtures/private.json")).then(shouldNotCalled, error => {
            assert.ok(/This package is private/.test(error.message));
        });
    });
    it("should be rejected, it is already published", () => {
        return canNpmPublish(path.join(__dirname, "fixtures/already-published.json")).then(shouldNotCalled, error => {
            assert.ok(/is already published/.test(error.message));
        });
    });
    it("should be resolve, it is not published yet", () => {
        return canNpmPublish(path.join(__dirname, "fixtures/not-published-yet.json"));
    });
});