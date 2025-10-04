# AstroVerse Explorer 🌌

AstroVerse Explorer is an interactive web application designed for exploring the Moon phases and Solar System in a fun and educational way. Users can select dates to view Moon phases, check planet positions with realistic PNG images and slow 3D-ish orbits, and interact with a chatbot powered by OpenAI GPT that answers questions about the Solar System. The background features aliens and AstroNet having a chai party, making learning cosmic science engaging and visually appealing.

## Features

- 🌙 **Moon Phases**: Select a date to see the Moon phase using PNG images.
- 🪐 **Solar System Explorer**: View planets with realistic textures, names, and slow orbital motion based on a selected date.
- 🤖 **AstroBot Chat**: Predefined questions and custom questions answered by aliens/AstroNet. Includes images, diagrams, and “Learn More” links.
- 🚀 **Floating Rocket Button**: Opens chat panel.  
- 👽 **Aliens + AstroNet Background**: Fun chai party illustration in the background.
- 💫 **Interactive Animations**: Dancing Solar System button, twinkling stars, slow planet orbits.

## Project Structure

AstroVerseExplorer/
│
├── index.html # Main HTML file
├── style.css # CSS for styling and animations
├── script.js # JavaScript for Moon, planets, chat functionality
├── app.py # Flask backend for AI responses
├── assets/ # Images
│ ├── planets/ # Planet PNG images
│ ├── moon/ # Moon phase PNG images
│ ├── aliens/ # Alien and AstroNet images
│ └── rocket.png # Rocket image for chat button  

## How to Run

1. **Clone or download the repository**.

2. **Install dependencies**:

```bash
pip install flask openai
Set OpenAI API key:setx OPENAI_API_KEY "YOUR_API_KEY"   # Windows
export OPENAI_API_KEY="YOUR_API_KEY" # Mac/Linux
Run Flask backend:python app.py
Technologies Used

HTML, CSS, JavaScript (frontend)

Python Flask (backend)

OpenAI GPT API (chatbot)

PNG images for Moon, planets, aliens, and rocket
