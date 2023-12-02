# SE3316 Lab 4

# Objective
1. Client application w/ ReSTfull web API
2. Implement authentication protocol w/ different levels of functionality based on authentication
3. Client application works on mobile
4. Application should resist malicious exploitation
5. Security & Privacy Policy publicly accessible
6. Provide DMCA notice & takedown policy

# Authentication
1. text field for email and password
2. enter existing email & password -> gives error
3. enter email/password not know -> gives error
4. mechanism to update password for authenticated user
5. login area -> offers new account creation (NAC)
6. selecting NAC -> shows username, email, and password
7. during NAC, email alr exists -> gives error

# Input Validation
1. empty email field -> prompt user to enter email
2. empty pass field -> prompt user to enter pass
3. invalid email address -> prompt user to enter valid password

# Verification of Email
1. user instructed to click on link to verify email
2. shown text / receives email containing link
3. link shows page that says email is validated
4. click on link -> email is validated
5. if user tries to login without validating email -> email not verified, resend validation email

# Deactivated Accounts
1. logging in is disabled for accounts that are 'deactivated'
2. message shown -> [CONTACT ADMIN]

# Unautheticated Users
1. start page [x]
    - application name [x]
    - about blurb [x]
    - login button [x]

2. interface for searching heroes
    - search mechanisms for heroes [x]
    - show entries beginning w/ search term [x]
    - each search result matches search terms [x]
    - empty search term matches all search values [x]
    - name & publisher of each matching hero are shown [x]

3. expand search result to view info
    - view all available info
    - name & publisher of other results remain visible [x]

4. button for search on ddg
    - "search" button shown along each track
    - clicking on button opens new tab w/ ddg
    - search page shows results of search w/ name & publisher

5. keywords are soft matched
    - capitalization
    - white-space
    - two characters are missing or different

6. list of public lists
    - start page shows up to 10 public lists
    - private list not shown
    - each list shows : [list name, creator nickname, number of heroes, average rating]
    - creator email is hidden
    - list ordered by last-modified date
    - no aspect of list is modifiable

7. ability to expand each list
    - expand information shown for each displayed list
    - expanded shows description & list of heroes
    - ability to reset display back to what is shown in 6
    - if user does modification, deletion, visibility changes after list is displayed is handled gracefully

8. ability to display additional information for heroes in public list
    - ability to show additional data like in 3.
    - ability to reset display back to what is shown in 6
    - rare conditions are handled gracefully    

# Additional Functionality for Authenticated Users
1. create up to 20 named lists of heroes
2. show full information about a list
3. edit all aspects of existing list
4. delete a list
5. add review to list

# Admin Functionality Related To Site Maintenance
1. special user w/ admin access
2. grant admin privileges to existing users
3. ability to mark review as hidden
4. ability to mark user as deactivated

# Webservice API
1. revise lab3 API as necessary to provide required functionality
2. build your application using this API

# Admin Functionality Related To Copyright
1. create security & privacy policy
2. create DMCA notice & takedown policy