DevSquad Challenge for QA Tester Candidate – https://qa-training.sbx.devsquad.app/

Candidate: Alice Sauruk de Andrade

Role: QA Tester

Reviewer: QA Lead Edmozer Souza

Test Framework: Playwright (TypeScript)



1. OVERVIEW

First and foremost, I would really like to take a small paragraph — maybe two — to share with you how much I truly enjoyed this one-of-a-kind experience. As I told you, Ed, everything was very new to me, but I was excited about this challenge and right after our talk on Friday, I immediately started learning how to install and use Playwright, as well as how to write and run the automated tests. I watched countless YouTube videos and, by the end of Friday night, I finally got it. On Saturday, I started developing the tests — and I will not even tell you how long that took — but by the end of the day, I had run them all and was very happy to see the results from the 74 tests that I had written.
Now, as I write this README, I am reflecting on how much I have learned in just one weekend. Thank you so much for this intense and truly unique opportunity that you gave me. I genuinely hope I get the chance to join the team, but even if I do not, I want you to know that I have already gained so much from it. Now let us get to the documentation.

This document provides a description of the entire QA process that I carried out in order to test the form available at https://qa-training.sbx.devsquad.app/. The goal was to check if all fields behave correctly both from a functional and user experience perspective, to identify bugs by running automated tests. First, I performed manual exploratory tests and then, the automated tests were developed using Playwright (TypeScript). I tried to explore each component and field on the form, submitting it to various cases, such as invalid/valid data, accessibility interactions (mouse vs. keyboard), etc.


2. SCOPE OF TESTING


2.1 COMPONENTS AND FIELDS TESTED

•	Full Name

•	Email Address

•	Phone Number (Prefix and Number)

•	Date of Birth

•	Address

•	Country of Residence

•	State

•	Annual Income

•	Client Type (Radio: Individual/Business)

•	Checkbox – I agree to the Terms and Conditions

•	Submit Button


2.2 THE FIELDS WERE TESTED FOR:

•	Input validation (min/max length, required, data type)

•	Boundary cases (empty values, extra-long input, invalid formats)

•	Behavior under UI events (click, keyboard navigation)

•	Feedback messaging (error/success alerts)

•	Key Findings and Bugs Identified


3. EXPECTED BEHAVIOR

3.1 WORKING AS INTENDED

Despite the bugs that I was able to find, I was also able to realize that many of the form's core functionalities are working as intended, and I think it is important to give you an overview of everything. The following behaviors were validated during the testing process:

Full Name

•	Accepts many inputs including letters, numbers, spaces, and special or accented characters (e.g., Érica Silva, Pedro Dal’Cortivo and King Charles The 2nd).

•	Correctly applies the validation rules for character limits, requiring a minimum of two and a maximum of fifty characters.

•	Displays a clear error message if the field is left blank or if the input is too short or too large.


Email Address

•	It needs an @ symbol with content before and after it.

•	It correctly rejects email formats that are missing the @ symbol or that have it duplicated.

•	The field is successfully marked as required and displays an error message when trying to submit while empty.


Phone Number

•	The prefix accepts only numeric characters and enforces a two-digit limit.

•	The main phone number input also accepts only number.

•	Both fields are correctly treated as optional — which I think is fine — and allow the form to be submitted successfully when left blank.

Date of Birth

•	The field correctly accepts valid dates within the specified DD/MM/YYYY format.

•	It allows the users to choose between inputing the date by typing or by selecting from the calendar widget.

•	It functions correctly with a wide range of dates.

•	It displays a required field error message if left empty.

Address

•	This specific field is very flexible, correctly accepting letters, numbers, line breaks for multi-line addresses, and various special characters.

•	There is a maximum character limit of 250 which also displays an error message.

•	It is treated as an optional field, allowing the form to be submitted when empty.

Country of Residence

•	The dropdown interaction works as expected, correctly displaying the three available options: Brazil, United States, and Canada.

•	It is as a single-selection dropdown, preventing multiple countries from being chosen at once.

•	It is a required field and also blocks submission with an error message when no country is selected.

State

•	The logic is implemented correctly: the field is initially disabled and becomes enabled only after a country is selected.

•	It also functions as a single-selection dropdown.

•	It is a required field and blocks submission with an error message if a country has been chosen but the state is left empty.

Annual Income

•	The input field correctly accepts a large range of numerical data (e.g., integers, decimals, zero.)

•	The auto-formatting feature works as intended, correctly adding commas for thousand separators for large numbers (e.g., 1234567 becomes 1,234,567).

•	The field accepts only numeric characters.

Client Type (Radio Buttons)

•	The "Business" option functions as expected. It can be selected with a mouse click and remains selected.

Checkbox – I agree to the Terms and Conditions

•	The checkbox can be successfully checked and unchecked via keyboard navigation using both Enter and Spacebar.

Submit Button and Overall Form Feedback

•	The form submission works as expected when all validation rules are met.

•	Upon successful submission, a clear confirmation message, “Client created successfully!”, is displayed to the user.

3.2 BUGS REPORTS AND FINDINGS


Although the form works correctly in many situations, I was able to find some bugs and unexpected behaviors during the testing process. Below I am going to list the main issues, organized by field or component, as previously done. Each description highlights what went wrong and how it affected usability, accessibility, or data integrity.

Full Name

•	While the field requires minimum and maximum character limits, its validation logic is not very good. It accepts clearly invalid values such as 01, or names composed only of symbols like @@@.

•	These inputs should be rejected or at least flagged with a warning to avoid polluting the list of submissions with meaningless data.

Email Address

•	Although the field requires an @ symbol and some text before and after it, the validation rules are still weak. Invalid formats such as 1@1, test @email.com are accepted without error messages.

•	This could allow users to submit non-functional email adresses.

Phone Number (Prefix and Number)

•	The prefix only allows two digits, which excludes valid international country codes like Uruguay's +598.

•	The main phone number input enforces a U.S.-style format (e.g., (123) 456-7890), which doesn't adapt well to other formats, especially When considered that the form allows choosing countries other than the United States.

•	There is a space before the () which makes 11-digit phone number not being able to be typed.

•	The form can be submitted even when the phone number is incomplete or invalid, since the field is not required.

Date of Birth

•	This field allows typing or selecting dates using the calendar, but it accepts unrealistic values such as years as early as 0001 or as late as 9999.

•	It also accepts the typing of dates that do not exist, such as February 31st or April 31st, but it does not submit the application. The issue here is that the form blocks submission, but no feedback is shown to the user explaining why the date is invalid.

Address

•	The address field accepts long inputs without any guidance until the 250-character limit is reached.

•	There is no real-time counter or warning to help the user adjust their input.

Country of Residence

•	The field does not support keyboard navigation or text input. 

•	The list of available states is not dynamically filtered based on the selected country. For example, choosing “Brazil” still shows “Arizona” as a state option.

State

•	The field also does not support keyboard navigation or text input. 

•	As mentioned previously, this section contains options that do not match the selected country and even so the form allows submission.

•	If the user selects a country and a state, then changes the country, the previously selected state remains active, resulting in inconsistent and invalid data.

Annual Income

•	Although this is a required field, leaving it blank results in no error message being displayed, only a red alert tracing the field.

•	The field accepts negative values, not preventing submission or alerting the user when something is wrong.

Client Type (Radio Buttons)

•	This functionality is visibly broken. It is not possible to select and sustain the “Individual” option — whether using the mouse or keyboard — because any attempt to select it causes the radio button to automatically change to “Business”.

•	Once “Business” is selected, it cannot be deselected or changed.

Checkbox – I agree to the Terms and Conditions

•	This checkbox cannot be clicked using the mouse — it only works with the keyboard via Tab + Enter or Tab + Spacebar.

•	The form can be submitted even if this checkbox is left unchecked, dissolving both accessibility and the legal/functional purpose of having such an important field in the first place.

Submit Button and Overall Navigation

•	If  there are errors or missing required fields (especially in the case of Annual Income or invalid Date of Birth), the form fails with no feedback for these specific errors.

4. SUGGESTIONS FOR IMPROVEMENT
   

Based on the findings from both automated and exploratory testing, I recommend the following improvements to enhance the form's quality, data integrity, and user experience.

Data Integrity and Validation Logic

•	Implement stricter validation rules for critical fields. For example, the Full Name field should not accept inputs consisting only of numbers or symbols, and the Email Address field should reject clearly invalid formats like 1@1.

•	The highest priority should be to fix the logic that links countries to states. The State dropdown must be correctly filtered to show only relevant options based on the Country of Residence selection.

•	The “I agree to the Terms and Conditions” checkbox should be made mandatory for form submission.

•	Rules should be reviewed to prevent illogical data entry, such as negative values for Annual Income or future dates for Date of Birth.

User Experience and Feedback

•	Ensure all validation errors provide clear feedback. This is needed for the Annual Income field when left blank and for the Date of Birth field when an invalid date (like February 31) is entered.

•	The State field selection should automatically reset whenever the Country of Residence is changed. This prevents user confusion and invalid combinations.

•	The input for the Phone Number fields should be updated to support valid international formats, including prefixes with more than two digits and 11-digit phone numbers.

Accessibility

•	All interactive elements must be fully functional with both mouse and keyboard. This includes making the Terms and Conditions checkbox clickable and enabling keyboard navigation for the Country of Residence and State dropdowns.

5. CONCLUSION

This test was fully designed and implemented by me to cover all aspects that I considered essential for this challenge. I know that I still have much to learn, but I want to emphasize that if given the opportunity, I will dedicate myself and continue to improve every day.
All test files are organized within the tests folder for clarity and structure. Thank you very much for your time and for considering my application.
