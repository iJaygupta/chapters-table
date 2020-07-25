# TOC (Table of Content) Assignment

To start with the assignment, make sure you have the latest version of node.js. Install it from [here][nodejs]. After installing open the folder in a terminal / command prompt and issue the following commands to get started:

  ```sh
  $ cd niyo
  $ npm install
  $ npm start
  ```

The server would be by default running on http://localhost:3000. If you wish to change the port, you can do that in line 8 of ```index.js``` in root folder. All the files that you are required to edit is present in the ```public``` folder. Please do not make any changes to ```api``` folder as it is responsible for serving the API requests.

# API Documentation

There are two types of APIs here. One is to get the first level book details and the other to get the second level details

**Get Book Details:** 

This API is responsible for getting first level details (gets details of chapters and lessons in first level)
* **URL**
    `/api/book/:id`
* **Method:**
  `GET`
* **Path Params:**
  * **id**: The id of the book. Eg: maths
* **Sample Success Response:**
  The success response is an array of objects. Each Object can be a chapter or a lesson
  ```
    {
      response: [
        {
          childrenCount: 9, //The number of lesson the chapter has
          id: 4443990, //The id of chapter or lesson
          sequenceNO: 1, //The order in which the item should be displayed in toc
          title: "Ratios", //The title of chapter or lesson
          type: "chapter", //Can be either "chapter" or "lesson"
          completeCount: 9 //The count of lesson that has been complete under this chapter
        },
        {
          childrenCount: 0, //Will be always 0 for lessons
          id: 1131520, //The id of chapter or lesson
          sequenceNO: 2, //The order in which the item should be displayed in toc
          title: "Fractions Explained in Depth", //The title of chapter or lesson
          type: "lesson", //Can be either "chapter" or "lesson"
          status: "COMPLETE" //Status of lesson
        }
    ],
      status: "OK",
      statusCode: 200 
    }
    ```
* **Sample Error Response:**
    ```
    {
        response: {
            message: "Book not found in DB"
        },
        status: "NOT-FOUND",
        statusCode: 404
    }
    ```
* **Example**
  ```http://localhost:3000/api/book/maths```

**Get Chapter Details:** 

This API is responsible for getting the second level details (gets details of lessons under a chapter)
* **URL**
    `/api/book/:id/section/:sectionid`
* **Method:**
  `GET`
* **Path Params:**
  * **id**: The id of the book. Eg: maths
  * **sectionid**: The id of the chapter. Eg: 4443990
* **Sample Success Response:**
  The success response is an array of objects. Each Object is a lesson with status of completion
  ```
    {
      response: [
        {
            id: 4423715, //The id of the lesson
            sequenceNO: 1, //The order in which the item should be displayed in toc
            title: "Introducing Ratios - Math 6 CCSS", //The title of lesson
            type: "lesson", //Type is always lesson
            status: "COMPLETE" //Can be one of "COMPLETE", "IN_PROGRESS", "NOT_STARTED"
        }
    ],
      status: "OK",
      statusCode: 200 
    }
    ```
* **Sample Error Response:**
    ```
    {
        response: {
            message: "Book or section not found in DB"
        },
        status: "NOT-FOUND",
        statusCode: 404
    }
    ```
* **Example**
  ```http://localhost:3000/api/book/maths/section/4443990```


   [nodejs]: <https://nodejs.org/en/download/>
