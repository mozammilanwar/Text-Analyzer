import React, { useState } from "react";
import axios from "axios";
const WordInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [character, setCharacter] = useState(0);
  const [word, setWord] = useState(0);
  const [definition, setDefinition] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const onSubmit = async() => {
    // character count
    const characterCount = searchTerm.length;
    setCharacter(characterCount);

    // word count
    const words = searchTerm.split(/\s+/); // Split by spaces
    const wordCount = words.filter((word) => word.length > 0).length;
    setWord(wordCount);

    // API request
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      const data = response.data[0];
      setDefinition(data.meanings[0]?.definitions[0]?.definition || "No definition available");
      setPartsOfSpeech(data.meanings[0]?.partOfSpeech || "Unknown");
      setSynonyms(data.meanings[0]?.synonyms || []);
      setAntonyms(data.meanings[0]?.antonyms || []);
    } catch (error) {
      console.error("Error fetching word information:", error);
    }
  }
  return (
    <div>
      <div className="flex justify-evenly items-center mt-10">
        <div className="w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a word"
            className="w-11/12 p-2"
          />
        </div>
        <div>
          <button className="w-40 me-20"style={{ backgroundColor: '#731ee2', color: 'white' }} onClick={onSubmit}>
            Process Word
          </button>
        </div>
      </div>
      <div className="flex w-96 mt-10">
        <table className="w-full border">
          <thead className="">
            <tr className="flex justify-between">
              <th className="ms-5">Character</th>
              <th className="me-5">Word</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between">
              <td className="ms-8">{character}</td>
              <td className="me-10">{word}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-10 border pt-5 ps-3 pb-5 me-20">
        <p className="">Defination: {definition || "No definition available"}</p>
        <p className="mt-3">Parts of speech: {partsOfSpeech}</p>
        <p className="mt-3">Synonyms: {synonyms.join(", ") || "No synonyms available"}</p>
        <p className="mt-3">Antonyms: {antonyms.join(", ") || "No antonyms available"}</p>
      </div>
    </div>
  );
};
export default WordInput;