import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/davinci-codex/completions";

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const splitText = (text, maxLength) => {
    const words = text.split(" ");
    let result = [];
    let currentChunk = "";

    for (const word of words) {
      if ((currentChunk + word).length <= maxLength) {
        currentChunk += word + " ";
      } else {
        result.push(currentChunk.trim());
        currentChunk = word + " ";
      }
    }

    if (currentChunk) {
      result.push(currentChunk.trim());
    }

    return result;
  };

  const handleSubmit = async () => {
    try {
      setLoadingProgress(0);
      const chunks = splitText(inputText, 4000);
      let generatedSummary = "";

      for (const [index, chunk] of chunks.entries()) {
        const prompt = `Please summarize the following text:\n\n${chunk}\n\nSummary:`;
        const response = await axios.post(
          OPENAI_API_URL,
          {
            prompt,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        generatedSummary += response.data.choices[0].text.trim() + " ";
        setLoadingProgress(((index + 1) / chunks.length) * 100);
      }

      setSummary(generatedSummary.trim());
    } catch (error) {
      console.error("Error:", error);
      console.error("Error response:", error.response);
      setSummary(
        "Error: Failed to generate summary. Check your API key and request parameters."
      );
    } finally {
      setLoadingProgress(0);
    }
  };

  return (
    <Container>
      <h1 className="text-center my-4">AI-Powered Text Summarizer</h1>
      <Form>
        <Form.Group controlId="apiKey">
          <Form.Label>API Key</Form.Label>
          <Form.Control
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your API key"
          />
        </Form.Group>
        <Form.Group controlId="inputText">
          <Form.Label>Input Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={inputText}
            onChange={handleTextChange}
            placeholder="Paste your text or upload a .txt file"
          />
        </Form.Group>
        <InputGroup className="mb-3">
          <FormControl
            type="file"
            accept=".txt"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onload = (event) => setInputText(event.target.result);
              reader.readAsText(file);
            }}
          />
        </InputGroup>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loadingProgress > 0}
        >
          Summarize
        </Button>
        {loadingProgress > 0 && (
          <div className="text-center mt-3">
            <Spinner animation="border" role="status" />
            <p>Loading: {loadingProgress.toFixed(0)}%</p>
          </div>
        )}
      </Form>
      {summary && (
        <>
          <h2 className="text-center my-4">Summary</h2>
          <Row>
            <Col>
              <div className="border rounded p-3 bg-light">{summary}</div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
