const test = require('@playwright/test');

exports.customtest = test.extend({

    testDataForOrder: {
        usernameEmail: "1RrKgVZUdVko@yopmail.com",
        password: "1RrKgVZUdVko",
        productName: "ZARA COAT 3",
        countryCode: "ind",
        countryName: "India"
    }

})