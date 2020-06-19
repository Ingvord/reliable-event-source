import {Subject} from "rxjs";

function connect(url, options, delay) {
    this.source = new EventSource(url, options);

    this.source.onerror = (err) => {
        console.debug("Got error from EventSource: " + err)
        this.source.close();
        setTimeout(() => {
            console.debug("Trying to reconnect...")
            connect.call(this, url, options, delay);
            initialize.call(this);
        }, delay);
    }
}

function initialize() {
    this.source.onmessage = (msg) => {
        this.subject.next(msg)
    }

    this.channels.forEach((v, k) => {
        this.source.addEventListener(k, (msg) => {
            v.next(msg);
        })
    })
}

/**
 * This class wraps EventSource to provide reliability i.e. auto reconnect on error as well as continuous events flow for all subscribers
 * @type ReliableEventSource
 */
export class ReliableEventSource {
    /**
     *
     * @param {string} url
     * @param {{}} options
     * @param {number} delay
     * @constructor
     */
    constructor(url, options, delay) {
        this.subject = new Subject();

        this.channels = new Map();

        connect.call(this, url, options, delay);
        initialize.call(this);
    }

    /**
     *
     * @param {string} [channel = undefined] channel - channels name i.e. event name on the server side
     * @return {Observable}
     */
    observe(channel = undefined) {
        if (!channel || channel === 'message')
            return this.subject;
        if (this.channels.has(channel)) {
            return this.channels.get(channel);
        } else {
            const subject = new Subject();
            this.source.addEventListener(channel, (msg) => {
                subject.next(msg)
            })
            return this.channels.set(channel, subject).get(channel);
        }
    }
}