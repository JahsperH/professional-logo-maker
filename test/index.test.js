const { logo, shape, text } = require("../index.js");


describe("logo", () => {
    var testshape = new shape('square', 'red');
    var testtext = new text('test', 'blue');
    var testlogo = new logo(testshape, testtext);

    test('testshape', () => {
        expect(testlogo.shape.type).toBe('square');
        expect(testlogo.shape.color).toBe('red');
    });

    test('testtext', () => {
        expect(testlogo.text.text).toBe('test');
        expect(testlogo.text.color).toBe('blue');
    }
    );

    test('testsvg', () => {
        expect(testlogo.shape).toBe(testshape);
        expect(testlogo.text).toBe(testtext);
    });
});
