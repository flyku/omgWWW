import Polygon from 'app/component/polygon';

describe('ES6 Polygon', function() {
    let polygon = new Polygon(5, 4);

    it('should return 20 when calling calcArea', function() {
        assert.equal(20, polygon.calcArea());
    });
});
