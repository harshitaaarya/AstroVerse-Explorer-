// Stars
const starsContainer = document.querySelector('.stars');
for(let i=0;i<200;i++){
  const star=document.createElement('div');
  star.classList.add('star');
  star.style.top=Math.random()*100+'%';
  star.style.left=Math.random()*100+'%';
  star.style.width=star.style.height=(Math.random()*2+1)+'px';
  starsContainer.appendChild(star);
}

// Moon boxes
const moonContainer=document.getElementById('moonContainer');
const thankyou=document.getElementById('thankyou');

const createMoonBox=()=>{
  const box=document.createElement('div');
  box.classList.add('moon-box');
  const label=document.createElement('div');
  label.classList.add('enter-date');
  label.innerText='Enter your date here';
  const input=document.createElement('input');
  input.type='date';
  const moon=document.createElement('div');
  moon.classList.add('moon');
  const phase=document.createElement('div');
  phase.classList.add('phase');
  moon.appendChild(phase);
  box.appendChild(label);
  box.appendChild(input);
  box.appendChild(moon);

  input.addEventListener('change',()=>{
    const date=new Date(input.value);
    if(!input.value) return;
    const lp=29.530588853;
    const newMoon=new Date('2025-09-14');
    const phaseCalc=((date-newMoon)/86400000)%lp;
    const phaseRatio=phaseCalc/lp;
    let offset=0;
    if(phaseRatio<0.125||phaseRatio>0.875) offset=180;
    else if(phaseRatio<0.25) offset=180-(phaseRatio/0.25)*180;
    else if(phaseRatio<0.375) offset=0;
    else if(phaseRatio<0.625) offset=-180*(phaseRatio-0.375)/0.25;
    else if(phaseRatio<0.75) offset=-180;
    else if(phaseRatio<0.875) offset=-180+((phaseRatio-0.75)/0.125)*180;
    phase.style.left=offset+'px';
    thankyou.style.display='flex';
  });

  return box;
};

document.getElementById('myself').addEventListener('click',()=>{
  moonContainer.innerHTML='';
  moonContainer.appendChild(createMoonBox());
});

document.getElementById('couple').addEventListener('click',()=>{
  moonContainer.innerHTML='';
  moonContainer.appendChild(createMoonBox());
  moonContainer.appendChild(createMoonBox());
});

// Solar System Animation
document.getElementById('solar').addEventListener('click',()=>{
  moonContainer.innerHTML='';

  const solarContainer=document.createElement('div');
  solarContainer.classList.add('solar-container');

  const sun=document.createElement('div');
  sun.classList.add('sun');
  solarContainer.appendChild(sun);

  const planetsData=[
    {name:'Mercury', color:'gray', radius:50, speed:0.02},
    {name:'Venus', color:'yellow', radius:80, speed:0.015},
    {name:'Earth', color:'blue', radius:110, speed:0.01},
    {name:'Mars', color:'red', radius:140, speed:0.008},
    {name:'Jupiter', color:'orange', radius:180, speed:0.005},
    {name:'Saturn', color:'goldenrod', radius:220, speed:0.004},
    {name:'Uranus', color:'lightblue', radius:260, speed:0.003},
    {name:'Neptune', color:'darkblue', radius:300, speed:0.002}
  ];

  planetsData.forEach(planet=>{
    const orbit=document.createElement('div');
    orbit.classList.add('orbit');
    orbit.style.width=orbit.style.height=(planet.radius*2)+'px';
    orbit.style.animation=`rotateOrbit ${1/planet.speed}s linear infinite`;

    const p=document.createElement('div');
    p.classList.add('planet');
    p.style.background=planet.color;
    p.title=planet.name;

    orbit.appendChild(p);
    solarContainer.appendChild(orbit);
  });

  moonContainer.appendChild(solarContainer);
});

// Chatbot
const chatbotBubble = document.getElementById('chatbotBubble');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChat = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const showQuestionsBtn = document.getElementById('showQuestionsBtn');
const predefinedQuestions = document.getElementById('predefinedQuestions');
const questionItems = predefinedQuestions.querySelectorAll('.question');

chatbotBubble.addEventListener('click',()=>chatbotWindow.style.display='flex');
closeChat.addEventListener('click',()=>chatbotWindow.style.display='none');

// Chatbot bubble floating animation
setInterval(()=>{
  chatbotBubble.style.transform = `translateY(${Math.sin(Date.now()/300)*5}px) rotate(${Math.sin(Date.now()/300)*5}deg)`;
},30);

// Show questions one by one
predefinedQuestions.style.display='none';
questionItems.forEach(item=>item.style.display='none');

showQuestionsBtn.addEventListener('click',()=>{
  predefinedQuestions.style.display='block';
  questionItems.forEach((item,i)=>{
    setTimeout(()=>{item.style.display='list-item';}, i*200);
  });
});

// Add click on predefined question
questionItems.forEach(item=>{
  item.addEventListener('click',()=>sendMessage(item.innerText));
});

sendBtn.addEventListener('click',()=>sendMessage(userInput.value));

function addMessage(msg,type){
  const div=document.createElement('div');
  div.classList.add(type==='user'? 'userMsg':'botMsg');
  div.innerHTML=msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
  userInput.value='';
}

function sendMessage(msg){
  if(!msg) return;
  addMessage(msg,'user');

  fetch('http://127.0.0.1:5000/ask',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({question:msg})
  })
  .then(res=>res.json())
  .then(data=>{
    let answerHTML = `<span style="color:white">${data.answer}</span>`;
    if(data.image) answerHTML+=`<br><img src="${data.image}" style="width:100%;border-radius:10px;margin-top:5px">`;
    answerHTML+=`<br><a href="${data.learn_more}" target="_blank" style="color:lightblue">Learn More</a>`;
    addMessage(answerHTML,'bot');
  })
  .catch(err=>addMessage('<span style="color:white">Error connecting to AI backend</span>','bot'));
}
