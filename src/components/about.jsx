import React from "react";

const About = () => {
  return (<div className="container mx-auto flex flex-col items-center md:w-9/12">
  <h1 className="text-2xl text-teal-600 mb-2">Pari Vandaei</h1>
  <p className="text-sm">
     Email:
    <a href="../index.html">
      pari.t.vanda@gmail.com
    </a>
    <h4 className="w-full text-lg text-teal-500">Links</h4>
  <div className="container mx-auto flex flex-col items-start pl-8">
    <a href="https://github.com/ptvce" className="text-blue-400">
      Github|  
    </a>
    <a
      href="https://www.linkedin.com/in/parivandaei/" target="_blank"
      className="text-blue-400"
    >
       Linkedin|
    </a>
    <a
      href="https://ptvce.github.io/Me/" target="_blank"
      className="text-blue-400"
    >
       Me
    </a>
  </div>
  </p>

  <br />

  <h4 className="w-full text-lg text-teal-500">Professional Summary</h4>
  <p>
  I have been a Software Developer with experience in the whole system development life cycle focused on .Net
            technologies. Currently, I’m working as a Freelance frontend developer with React and React Native. 
            I've worked as a Frontend Developer in the Software Team since 6 years ago. I like to work with other people
             and I find that it’s much easier to achieve something when everyone works together and communicates well. 
             I love my job and I always make every endeavor to take the opportunities on this way and every endeavor for 
             updating my knowledge. I am enthusiastic about learning new skills and sharing them with others. big fan of 
             accuracy besides speed. 
  </p>

  <br />
  <h4 className="w-full text-lg text-teal-500">Skills</h4>
  <div className="w-4/5 flex">
    <span className="w-1/3 flex flex-col pr-16 text-gray-700 text-sm border-b-2 border-teal-500 mr-10">
      Backend|
    </span>
    <span className="w-1/3 flex flex-col pr-16 text-gray-700 text-sm border-b-2 border-teal-500 mr-10">
      Frontend|
    </span>
    <span className="w-1/3 flex flex-col pr-16 text-gray-700 text-sm border-b-2 border-teal-500 mr-10">
      DevOps
    </span>
  </div>
  <div className="w-4/5 flex">
    <div className="w-1/3 flex">
      <ul className="flex flex-col w-1/2">
        <li>C#</li>
        <li>Rest API</li>
        <li>EF</li>
      </ul>
      <ul className="flex flex-col w-1/2">
        <li>MangoDB</li>
        <li>Postgre</li>
        <li>MySql</li>
      </ul>
    </div>
    <div className="w-1/3 flex">
      <ul className="flex flex-col w-1/2">
        <li>JavaScript</li>
        <li>React</li>
        <li>React Native</li>
        <li>Redux</li>
        <li>Vue.js</li>
      </ul>
      <ul className="flex flex-col w-1/2">
        <li>HTML</li>
        <li>CSS</li>
        <li>Bootstrap</li>
      </ul>
    </div>
    <div className="w-1/3 flex">
      <ul className="flex flex-col w-1/2">
        <li>Git</li>
        <li>TFS</li>
        <li>Confluence</li>
        <li>CI</li>
        <li>CD</li>
      </ul>
      
    </div>
  </div>

  <br />
  <h4 className="w-full text-lg text-teal-500">Last Projects</h4>
  <div className="container mx-auto flex flex-col items-start pl-8">
  <ul className="list-disc pl-5">
      <li>
      Terminal
      </li>
      <li>
      RamzArz
      </li>
      <li>
      Pay Slip MAnagement
      </li>
      <li>
      Guardzila
      </li>
      <li>
      GRC Management
      </li>
      <li>
      Train Management
      </li>
      <li>
      HRM
      </li>
      <li>
      Service Management
      </li>
      <li>
      Incident Management
      </li>
      <li>
      NeTSA
      </li>
      <li>
      Evaluation
      </li>
      
  </ul>
  </div>
  <br />

  <h4 className="w-full text-lg text-teal-500">Educations</h4>

  <div className="container mx-auto flex flex-col items-start pl-8">
    <p className="font-hairline text-gray-600">03/2015</p>
    <p className="font-thin text-gray-700">
      <b className="italic font-bold">
        <span className="text-teal-600">Master of Science</span>
        Software Engineer
      </b>
    </p>
    <p className="font-thin text-gray-700">
      University Shahid Beheshti
    </p>
  </div>

  <br />

  <div className="container mx-auto flex flex-col items-start pl-8">
    <p className="font-hairline text-gray-600">02/2004</p>
    <p className="font-thin text-gray-700">
      <b className="italic font-bold">
        <span className="text-teal-600">Bachelor of Science</span>
        Software Engineer
      </b>
    </p>
    <p className="font-thin text-gray-700">
      Azad University
    </p>
  </div>
 </div>);
};

export default About;


