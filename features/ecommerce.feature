Feature: Ecommerce validations

  Scenario: Placing the order
    Given I am logged in to ecommerce application with "1RrKgVZUdVko@yopmail.com" and "1RrKgVZUdVko"
    When "ZARA COAT 3" is added to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify order is present in the orders history
