# AI-Powered Text Summarizer

This is a simple React application that uses the OpenAI API to generate summaries for large texts. The user interface provides an input field for pasting text or uploading a text file and displays the generated summary below the input area.

![Screenshot from 2023-03-16 13-08-35](https://user-images.githubusercontent.com/8432835/225685996-e2d74a11-a477-4347-bc34-c51facb9fbfb.png)


## Features

- AI-Powered summarization using OpenAI API
- Text area input for pasting text
- File upload support for .txt files
- API Key input field
- Progress indicator with a spinner and percentage while processing

## Setup and Installation

Before you begin, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.

1. Clone the repository:
   git clone https://github.com/puppe1990/text-summarizer.git

2. Navigate to the project directory:

cd text-summarizer

3. Install the required dependencies:

npm install

4. Start the development server:

npm start

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## Usage

1. Enter your OpenAI API key in the "API Key" input field.
2. Paste your text in the "Input Text" field or upload a .txt file.
3. Click the "Summarize" button.
4. Wait for the progress indicator to reach 100%.
5. The generated summary will be displayed below the input area.

## Note

This project is for educational purposes only and is not suitable for production use. The API key is stored in the browser's local storage, and the API calls are made directly from the client-side, which can expose your API key to potential security risks. In a production environment, it is recommended to use a backend server to handle the API key and API calls securely.
