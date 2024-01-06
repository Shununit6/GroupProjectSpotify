# Users
## Sign Up
- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
- When I'm on the /signup page:
  - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
  - I would like the website to log me in upon successful completion of the sign-up form.
  - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

## Log in
- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
- When I'm on the /login page:
  - I would like to be able to enter my email and password on a clearly laid out form.
  - I would like the website to log me in upon successful completion of the log-in form.
  - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

## Demo User
- As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.
- When I'm on either the /signup or /login pages:
  - I can click on a Demo User button to log me in and allow me access as a normal user.
  - So that I can test the site's features and functionality without needing to stop and enter credentials.

## Log Out
- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
- While on any page of the site:
  - I can log out of my account and be redirected to a page displaying recent FauxTweets.
  - So that I can easily log out to keep my information secure.

# Songs
## Create Songs
- As a logged in user, I want to be able to post new songs.
- When I'm on the /new-song page:
  - I can upload a song to the website.
  - Songs need to include the following:
    - Song name
    - Artist
    - Path_or_url
  - The information that will be provided by the system is:
    - createdAt
    - updatedAt
  - If the information is invalid, there should be an error message.
  - If I am not a logged in user:
    - I should be redirected to the /signup page.

## Viewing Songs
- As a logged in or logged out user, I want to be able to view a selection of the most recent songs.
- When I'm on the /all-songs page:
  - I can view all the songs.
- As a logged in or logged out user, I want to be able to view a specific song and its associated Likes.
- When I'm on the /songs/:id page:
  - I can view the content of the song, as well as the associated Likes.

## Updating Songs
- As a logged in user, I want to be able to edit my songs by clicking an Edit button associated with the song anywhere that song appears.
- When I'm on the /songs, /songs/:id, or /users/:id/songs pages:
  - I can click "Edit" to make permanent changes to songs I have posted.
  - So that I can fix any errors I make in my songs.
  - So I can add songs or edit songs’ name, artist, path_or_url.

## Deleting Songs
- As a logged in user, I want to be able to delete my songs by clicking a Delete button associated with the song anywhere that song appears.
- When I'm on the /songs/:id, or /users/:id/songs pages:
  - I can click "Delete" to permanently delete a song I have posted.

# Albums
## Create Albums
- As a logged in user, I want to be able to post new albums.
- When I'm on the /new-album page:
  - I can upload an album to the website.
  - Albums need to include the following:
    - Album name
    - Album picture(album_art)
  - The information that will be provided by the system is:
    - Created by (access user_name through user_id)
    - createdAt
    - updatedAt
  - If the information is invalid, there should be an error message.
  - If I am not a logged in user:
    - I should be redirected to the /signup page.

## Viewing Albums
- As a logged in or logged out user, I want to be able to view a selection of the most recent albums.
- When I'm on the /all-albums page:
  - I can view all the albums created by me and other people.
- When I'm on the /:users/:id/albums page:
  - I can view all the albums created by me.
- As a logged in or logged out user, I want to be able to view a specific album and its associated Likes and songs.
- When I'm on the /album/:id page:
  - I can view the content of the album, as well as the associated Likes and songs.

## Updating Album
- As a logged in user, I want to be able to edit my albums by clicking an Edit button associated with the album anywhere that album appears.
- When I'm on the /albums, /albums/:id, or /users/:id/albums pages:
  - I can click "Edit" to make permanent changes to albums I have posted.
  - So that I can fix any errors I make in my albums.
  - So I can add songs to the albums.
  - So I can remove songs from the albums.

## Deleting Album
- As a logged in user, I want to be able to delete my albums by clicking a Delete button associated with the album anywhere that album appears.
- When I'm on the /album/:id, or /users/:id/albums pages:
  - I can click "Delete" to permanently delete an album I have posted.

# Likes
## Liking a Song
- As a logged in user, I want to be able to like a song.
- When I'm on any page with a song or an album:
  - I can click “like” to like the song.

## Viewing Likes on a Song
- As a logged in or logged out user, I want to be able to view the number of likes of a song.
- When I'm on any page with a song or an album:
  - I can view “like” symbol that is enabled on a song.
  - I can view “like” symbol that is not enabled on a song.
  - I can view the number of likes next to the “like” symbol.

## Unlike a Song
- As a logged in user, I want to be able to unlike/disable a “like”.
- When I'm on any page with a song or an album:
  - I can “unlike” by clicking “like” button associated with the song anywhere that song appears to permanently delete a like I have posted.

# Playlists
## Create A Playlist
- As a logged in user, I want to be able to create a playlist.
- When I'm on the /new-playlist page:
  - I can create a new playlist.
  - Playlist need to include the following:
    - Name
  - The information that will be provided by the system is:
    - createdAt
    - Created by
    - updatedAt
  - If the information is invalid, there should be an error message.
  - If I am not a logged in user:
    - I should be redirected to the /signup page.

## Viewing Playlists
- As a logged in or logged out user, I want to be able to view a selection of the most recent playlists.
- When I'm on the /playlists page:
  - I can view all the playlists.
- As a logged in or logged out user, I want to be able to view a specific playlist.
- When I'm on the /playlists/:id page:
  - I can view the content of the playlist, as well as the associated Likes.

## Updating Playlist
- As a logged in user, I want to be able to edit my playlists by clicking an Edit button associated with the playlist anywhere that playlist appears.
- When I'm on the /playlists/:id, or /users/:id/playlists pages:
  - I can click "Edit" to make permanent changes to playlists I have posted.
  - So that I can fix any errors I make in my playlists.
  - So I can add songs or remove songs.

## Deleting Playlists
- As a logged in user, I want to be able to delete my playlists by clicking a Delete button associated with the playlist anywhere that playlist appears.
- When I'm on the /playlists/:id, or /users/:id/playlists pages:
  - I can click "Delete" to permanently delete a playlist I have posted.
