Feature: Error validations

  @Validation
  Scenario: Placing a wrong order
    Given I am logged in to loginpagePractise application with "rahulshetty" and "FAKElearning"
    Then verify error message is displayed
