import React, { useState } from 'react'
import './App.css'
import openAIimg from './assets/openai.png'
import movie from './assets/extensionOLD.mov'

//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

function App() {
  const [apiValue, setApiValue] = useState('')
  const [encodedApiKey, setEncodedApiKey] = useState('')
  const [aiResults, setAiResults] = useState()
  const [prompt, setPrompt] = useState('')


  async function getOpenAI(prompt) {
    const openAiReq = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${atob(encodedApiKey)}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1250,
        temperature: 0.7,
      })
    })

    const openAiRes = await openAiReq.json()
    setAiResults(openAiRes.choices)
  }

  async function generate(info) {
    try {
      const basePromptPrefix = `List a few different ways of saying the following phrase (or combination of phrases). Make sure that the results are about the same length as the input, and mean the same thing, in the same context. Treat the answers like you're a thesaurus and you're finding synonyms but for phrases.
      Input: `
      const baseCompletion = await getOpenAI(`${basePromptPrefix}${info}`)
      console.log(baseCompletion)
    } catch (error) {
      console.log(error)
      setAiResults(error.toString())
    }
  }

  return (
    <div id='landing'>
      <div id='top'>
        <h1>SayDifferent.</h1>
      </div>
      <div id='main'>
        <div id='left'>
          <h1>Need to say something<br></br> in a <span><em>different</em></span> way?</h1>
          <div id='download'>
            <a href='#demo'><button id='trynow'>Try Now</button></a>
            <button>Add to Chrome</button>
          </div>
        </div>
      </div>
      <div id='about'>
        <div id='aboutText'>
          <h1>SayDifferent.</h1>
          <h3>Use the power of OpenAI to discover new and different ways <br></br> to say any phrase or sentence you could possibly think of. <br></br> <span><em>Explore the capabilities of Artificial Intelligence</em></span></h3>
        </div>
        <div id='aboutVideo'>
          <video id='tutorial' src={movie} loop autoPlay muted></video>
        </div>
      </div>
      <div id='demo'>
        <div id='apikeydiv'>
          <input id='apikey' placeholder='OpenAI Api Key' value={apiValue} onChange={(e) => setApiValue(e.target.value)}></input>
          <button id='subarrow' onClick={() => {setEncodedApiKey(btoa(apiValue)); setApiValue('')}}>SUBMIT</button>
        </div>
        {
          encodedApiKey !== '' ?
            <h3 id='apiSuccess'>Your API key is encrypted 😁</h3>
          : <h3 id='apiSuccess'>Please enter your API key</h3>
        }
        <div id='paste'>
          <input id='pasteinput' placeholder='What do you want to SayDifferent?' onChange={(e) => setPrompt(e.target.value)}></input>
          <button id='pastearrow' onClick={() => {generate(prompt); console.log(aiResults)}}>➜</button>
        </div>
        <div id='results'>
          {
            (!aiResults) ?
            <img id='openai' alt='' src={openAIimg} draggable='false'></img>
            : <h3 id='airesults'>{aiResults[0].text.substring(2)}</h3>
          }
        </div>
      </div>
      <footer id='footer'>Dylan West © 2023 • SayDifferent</footer>
    </div>
  );
}

export default App;
