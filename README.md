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
1. logging in is disabled for accounts that are 'deactivated' [x]
2. message shown -> [CONTACT ADMIN] [x]

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

6. list of public lists
    - start page shows up to 10 public lists [x]
    - private list not shown [x]
    - each list shows : [list name, creator nickname, number of heroes, average rating] [x]
    - creator email is hidden [x]
    - list ordered by last-modified date [x]
    - no aspect of list is modifiable [x]

7. ability to expand each list
    - expand information shown for each displayed list [x]
    - expanded shows description & list of heroes [x]
    - ability to reset display back to what is shown in 6 [x]
    - if user does modification, deletion, visibility changes after list is displayed is handled gracefully [x]

8. ability to display additional information for heroes in public list
    - ability to show additional data like in 3. [x]
    - ability to reset display back to what is shown in 6 [x]
    - rare conditions are handled gracefully [x]    

# Additional Functionality for Authenticated Users
1. create up to 20 named lists of heroes
    - mechanism to view all lists created by user [x]
    - list name must be unique [x]
    - mechanism to add optional description [x]
    - mechanism to set visibility to public [x]
    - visibility is set to private automatically [x]
    - mechanism to save list [x]
    - list without an attribute cannot be saved [x]
    - upon saving, list appears on lists created by user [x]

2. show full information about a list
    - shows all information about the list [x]

3. edit all aspects of existing list
    - show names of lists created by user [x]
    - select a list for editing [x]
    - can add or remove entry [x]
    - not able to add entry that doesn't exist [x]
    - saved changes appear on all applicable views of list [x]
    - updated date is changed to time of saving modified info [x]
    - non public lists are sorted to reflect modification time [x]
    - user cannot edit a list that the user does not own [x]
4. delete a list
    - select list for deletion [x]
    - ask for confirmation before deletion [x]
    - upon deletion, change is immediately reflected [x]
    - if confirmation declined, list is not deleted [x]
    - user cannot delete a list user does not own [x]
5. add review to list
    - select any public list for adding review [x]
    - enter rating for selected list [x]
    - enter comment for selected list [x]
    - mechanism to save review w/ confirmation
    - username & creation date are saved along w/ review

# Admin Functionality Related To Site Maintenance
1. special user w/ admin access
    - one user is designated as administrator [x]
2. grant admin privileges to existing users
    - mechanism to grant any user-created account admin privileges [x]
    - normal user cannot grant admin privileges [x]
3. ability to mark review as hidden
    - admin can select any review & mark as hidden
    - review with hidden status not shown anywhere on site
    - admin is able to remove hidden status
4. ability to mark user as deactivated
    - admin can deactivate any account [x]
    - user trying to log into deactivate account, login always fails w/ message that account is disabled & a contact of admin [x]
    - admin can remove deactivated mark from an account  [x]

# Webservice API
1. revise lab3 API as necessary to provide required functionality [x]
2. build your application using this API [x]

# Admin Functionality Related To Copyright [later]
1. create security & privacy policy
2. create DMCA notice & takedown policy
