Feature: Curl
    As an API Developer
    I want curl to be installed
    So that I can make HTTP requests

    Scenario: I successfully check the curl version
        Given I have a running talking-pickle instance
        When I make a curl request to HTTP Bin
        Then I receive a JSON response

