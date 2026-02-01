Feature: Error validations

  @Validation
  Scenario: Placing a wrong order
    Given I am logged in to loginpagePractise application with "<username>" and "<password>"
    Then verify error message is displayed

    Examples:
      | username    | password     |
      | rahulshetty | learning     |
      | rahulshetty | FAKElearning |
