import axios from 'axios'

export function translate(q, source, target) {
    return axios
        .post("https://libretranslate.de/translate", {
            q: q,
            source: source,
            target: target,
            format: "text"
        })
        .then(response => {
            return response.data.translatedText
        })
        .catch(error => {
            console.log(error)
            return "/"
        })
}

export function getLanguages() {
    return axios.get("https://libretranslate.de/languages")
        .then(response => {
                console.log(response)
                return response
            }
        )
}