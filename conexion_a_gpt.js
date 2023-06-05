import { Configuration, OpenAIApi } from "openai";
import { config } from 'dotenv';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})


const openAi = new OpenAIApi(configuration);


//COMPLETADO DE TEXTO

function generatePrompt(ciudad) {
    //return `Suggest the name of all the planets in the solar system inside an html structure`;
    return `dime en que continente está la ciudad indicada entre comillas: "${ciudad}"`;
}

const response = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt("hong kong"),
    temperature: 0,
    max_tokens: 250,
}
)

//console.log(response.data.choices[0].text);


//IMAGEN

const crearImagen = async (target) => {
    await openAi.createImage({
        prompt: `A wet on wet oil painting of ${target} by Bob Ross`,
        n: 1,
        size: "512x512"
    }).then(res=>{
        console.log(res.data.data[0].url);
    })
}

// crearImagen("Robin Hood");

//CHATS

//Se pasan varios mensajes para definir el comportamiento del sistema, y el intercambio de mensaje entre usuario y chat
async function contarChiste(modelo = "gpt-3.5-turbo", temperature = 0) {
    try {

        const mensajes = [{ 'role': 'system', 'content': 'You are an assistant that speaks like Shakespeare.' },
        { 'role': 'user', 'content': 'tell me a joke' },
        { 'role': 'assistant', 'content': 'Why did the chicken cross the road' },
        { 'role': 'user', 'content': 'I don\'t know' }]

        await openAi.createChatCompletion({
            model: modelo,
            messages: mensajes,
            //messages : mensajes,
            temperature: temperature,
            max_tokens: 250,
        }).then(res => {
            console.log(res.data.choices[0].message.content);
        })

    } catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else
            console.error(error.message);
    }
}

//contarChiste()

