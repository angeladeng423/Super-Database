# SE3316 Lab 4

# Objective
1. Client application w/ ReSTfull web API
2. Implement authentication protocol w/ different levels of functionality based on authentication
3. Client application works on mobile
4. Application should resist malicious exploitation
5. Security & Privacy Policy publicly accessible
6. Provide DMCA notice & takedown policy

# Authentication
1. text field for email and password [x]
2. enter existing email & password -> successful [x]
3. enter email/password not know -> gives error [x]
4. mechanism to update password for authenticated user
5. login area -> offers new account creation (NAC) [x]
6. selecting NAC -> shows username, email, and password [x]
7. during NAC, email alr exists -> gives error [x]

# Input Validation
1. empty email field -> prompt user to enter email [x]
2. empty pass field -> prompt user to enter pass [x]
3. invalid email address -> prompt user to enter valid email [x]

# Verification of Email
1. user instructed to click on link to verify email [x]
2. shown text / receives email containing link [x]
3. link shows page that says email is validated [x]
4. click on link -> email is validated [x]
5. if user tries to login without validating email -> email not verified, resend validation email [x]

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
    - view all available info [x]
    - name & publisher of other results remain visible [x]

4. button for search on ddg
    - "search" button shown along each track
    - clicking on button opens new tab w/ ddg
    - search page shows results of search w/ name & publisher

5. keywords are soft matched
    - capitalization [x]
    - white-space [x]
    - two characters are missing or different [x]
        - WORK ON POWER SOFTMATCHING NEXT

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
    - mechanism to view all lists created by user
    - list name must be unique
    - mechanism to add optional description
    - mechanism to set visibility to public
    - visibility is set to private automatically
    - mechanism to save list
    - list without an attribute cannot be saved
    - upon saving, list appears on lists created by user
2. show full information about a list
    - shows all information about the list
3. edit all aspects of existing list
    - show names of lists created by user
    - select a list for editing
    - can add or remove entry
    - not able to add entry that doesn't exist
    - saved changes appear on all applicable views of list
    - updated date is changed to time of saving modified info
    - non public lists are sorted to reflect modification time
    - user cannot edit a list that the user does not own
4. delete a list
    - select list for deletion
    - ask for confirmation before deletion
    - upon deletion, change is immediately reflected
    - if confirmation declined, list is not deleted
    - user cannot delete a list user does not own
5. add review to list
    - select any public list for adding review
    - enter rating for selected list
    - enter comment for selected list
    - mechanism to save review w/ confirmation
    - username & creation date are saved along w/ review

# Admin Functionality Related To Site Maintenance
1. special user w/ admin access
    - one user is designated as administrator [x]
2. grant admin privileges to existing users
    - mechanism to grant any user-created account admin privileges 
    - normal user cannot grant admin privileges
3. ability to mark review as hidden
4. ability to mark user as deactivated

# Webservice API
1. revise lab3 API as necessary to provide required functionality
2. build your application using this API

# Admin Functionality Related To Copyright
1. create security & privacy policy
2. create DMCA notice & takedown policy