import { useState } from "react";
import "./App.css";
import Paragraph from "./components/Paragraph";
import WordInput from "./components/WordInput";
function App() {
  const [activeWord, setActiveWord] = useState(false);
  const [activeParagraph, setActiveParagraph] = useState(false);
  const onWordClick = () => {
    setActiveWord(true)
    setActiveParagraph(false)
  }
  const onParagraphClick = () => {
    setActiveParagraph(true)
    setActiveWord(false)
  }
  return (
    <>
      <div>
        <h1>Text Analyzer</h1>
        <p className="mt-5">
          Text Analyzer is a simple free online tool for SEO web content
          analysis that helps you find most frequent phrases and words, number
          of characters, words, sentences and paragraphs, and estimated read and
          speak time of your content.
        </p>
        <div className="flex mt-10 mb-10">
          <button className="w-56" onClick={onWordClick}>Word Input</button>
          <button className="w-56" onClick={onParagraphClick}>Paragraph</button>
        </div>
        
      </div>
      {
        activeWord &&
        <div>
         
        <WordInput />
      </div>
      }
      {
        activeParagraph &&
        <div>
        <Paragraph />
        </div>
      }
      
    </>
  );
}
export default App;