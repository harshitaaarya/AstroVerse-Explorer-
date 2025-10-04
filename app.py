from flask import Flask, request, jsonify
import openai, os

app = Flask(__name__)
openai.api_key = os.environ.get("OPENAI_API_KEY")

PREDEFINED_QA = {
    "how many planets are there":"There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "which planet is closest":"Mercury is closest to the Sun.",
    "which planet is farthest":"Neptune is the farthest.",
    "planet vs dwarf":"A planet clears its orbit; a dwarf planet does not. Pluto is a dwarf planet.",
    "largest planet":"Jupiter is the largest planet.",
    "red planet":"Mars is called the Red Planet due to its reddish surface caused by iron oxide.",
    "phases of moon":"Moon phases occur because of Sun-Earth-Moon positions.",
    "comets vs asteroids":"Comets are icy; asteroids are rocky.",
    "four inner planets":"Mercury, Venus, Earth, Mars; all rocky.",
    "four outer planets":"Jupiter, Saturn, Uranus, Neptune; all gas giants.",
    "solar eclipse":"Moon blocks Sun (solar eclipse). Earth blocks Sun light on Moon (lunar eclipse)."
}

@app.route("/ask",methods=["POST"])
def ask():
    data=request.json
    question = data.get("question","").lower()
    
    # Predefined answers
    for key in PREDEFINED_QA:
        if key in question:
            image=None
            if "moon" in key:
                image="https://upload.wikimedia.org/wikipedia/commons/9/9f/Phases_of_the_moon.jpg"
            elif "planet" in key:
                image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Solar_sys8.jpg"
            return jsonify({"answer":PREDEFINED_QA[key],"learn_more":"https://solarsystem.nasa.gov","image":image})
    
    # AI response fallback
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role":"system","content":"You are an advanced astronomy tutor."},{"role":"user","content":question}],
        max_tokens=300
    )
    answer = response.choices[0].message.content
    image=None
    if "moon" in question:
        image="https://upload.wikimedia.org/wikipedia/commons/9/9f/Phases_of_the_moon.jpg"
    elif "planet" in question or "solar system" in question:
        image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Solar_sys8.jpg"
    
    return jsonify({"answer":answer,"learn_more":"https://solarsystem.nasa.gov","image":image})

if __name__=="__main__":
    app.run(debug=True)
