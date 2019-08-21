const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

https://www.eventbriteapi.com/v3/events/search?token={api-key}&location.latitude={lat}&location.longitude={lng}

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}/search?token=${EVENTBRITE_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`
        return request 
            .get(url)
            .then(res => {
                return formatEvents(res.body);
            });
    }
};

function formatEvents(response) {
    const events = [];
    const data = response.events;
    for(let i = 0; i < 20; i++) {
        const eventObj = data[i];
        const newEventObj = {
            link: eventObj.url,
            name: eventObj.name.text,
            event_date: eventObj.start.local,
            summary: eventObj.summary
        };
        events.push(newEventObj);
    }
    return events;
}
