import {ReliableEventSource} from "../src/index";

describe('ReliableEventSource', function () {
    describe('#observe()', function () {
        it('should get without error', function (done) {
            const rev = new ReliableEventSource('http://localhost:8080/magix/api/subscribe', {withCredentials: true}, 3000)
            rev.observe()
                .subscribe(msg => console.log(msg))

            setTimeout(() => {
                done()
            }, 3000)
        });
    });
});