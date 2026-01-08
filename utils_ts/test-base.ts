import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
    usernameEmail: string;
    password: string;
    productName: string;
    countryCode: string;
    countryName: string;
}

export const customtest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({

    testDataForOrder: {
        usernameEmail: "1RrKgVZUdVko@yopmail.com",
        password: "1RrKgVZUdVko",
        productName: "ZARA COAT 3",
        countryCode: "ind",
        countryName: "India"
    }

})