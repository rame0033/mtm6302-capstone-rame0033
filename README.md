# mtm6302-capstone-rame0033
Name: Gian William Ramelb
Student number: 041098029
Project: Astronomy Picture of the Day Search


## NASA A.P.O.D. UI 
View PDF [here](./gian-ramelb-apod-mockup.pdf)

As you load the main page, the default value of the `date input` will be the current day the user is viewing the page. The date can be changed depending on the user's preference and the photo and explanation of the desired A.P.O.D. will be shown once the user hits the search button. The main picture is clickable and be able to view it in full screen as High Definition image is available.Below the description, is the `Add to favorites` button where the user is able to save the A.P.O.D. if desired. The user has the ability to view the saved set of A.P.O.D. below the current A.P.O.D. and will be able to remove (Trash button) it if he/she doesn't like the certain A.P.O.D. anymore.


## Report

- I have built an initial HTML with the following elements:
1. Input
2. Button (Search, Favorites, and Delete)
3. Main img element
4. Heading elements
5. Main `<p>` element
6. List item that contains the marked as favorite image.

- Stylings have been applied. Highlight is that I used flex-wrap for the favorites container to easily contain the items and make it responsive.

- Challenges have been encountered especially when doing the styles for the application. So what I did is to add placeholders for the mean time. This helped me to set proper height and width specifically for images and the 'favorites' item card. 

### Report update (December 4, 2024)

- Another challenge was encountered since there was a redundancy in the code function in stored main image for the latest date, and the stored favorite main image. The overlay function has been refactored to ensure there is no redundancy in the blocks for new image and favorite image. See [latest commit](https://github.com/rame0033/mtm6302-capstone-rame0033/commit/a1e1f58983b3b4ce3e59dcc942af617d86f5aa0e) `line 36-65 marked on green` and `line 58-83 and 240-266 marked on red` for reference.

- Lastly, I saw that the class for NASA logo has been a default class also for images. For context, the NASA logo has its own preference of styling in case the provided APOD has no image but the class has been a default for the favorite image being shown in the main container so it may appear smaller. To fix, I set a condition where the class name "nasa-logo" will be applied if the image source shown in the main container is the source file of the logo.

## UPDATE

- User can now click the main image in the container and an overlay modal will appear showing the larger version of the main image file.



### Resources
- [MeyerWeb CSS Reset](https://meyerweb.com/eric/tools/css/reset/)

- [Google Font - Archivo](https://fonts.google.com/specimen/Archivo)