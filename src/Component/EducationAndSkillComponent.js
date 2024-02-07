import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Component/css/Applicant.css"
const EducationForm = () => {
  const [educationData, setEducationData] = useState({
    currentStatus: '',
    qualification: '',
    instituteName: '',
    yearAttained: '',
  });

  const [skillUserDTO, setSkillUserDTO] = useState({
    softSkill: [],
    hardSkill: [],
    language: [],
  });

  const [skillOptions, setSkillOptions] = useState({
    softSkills: [
      { skillId: 1, skillName: 'Communication' },
      { skillId: 2, skillName: 'Teamwork' },
      { skillId: 3, skillName: 'Problem Solving' },
    ],
    hardSkills: [
      { skillId: 4, skillName: 'Java' },
      { skillId: 5, skillName: 'HTML/CSS' },
      { skillId: 6, skillName: 'Project Management' },
    ],
    languages: [
      { skillId: 7, skillName: 'English' },
      { skillId: 8, skillName: 'Spanish' },
      { skillId: 9, skillName: 'French' },
    ],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (event, skillType) => {
    const selectedItems = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setSkillUserDTO((prevData) => ({
      ...prevData,
      [skillType]: selectedItems,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5042/api/Education/app',
        {
          educationDTO: educationData,
          skillUserDTO: skillUserDTO,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Education created:', response.data);
    } catch (error) {
      console.error('Error creating education:', error);
    }
  };

  return (
    <div>
      <h2>Create Education</h2>
      <form onSubmit={handleSubmit}>
        {/* Education */}
        <label>
          Current Status:
          <input
            type="text"
            name="currentStatus"
            value={educationData.currentStatus}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Qualification:
          <input
            type="text"
            name="qualification"
            value={educationData.qualification}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Institute Name:
          <input
            type="text"
            name="instituteName"
            value={educationData.instituteName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Year Attained:
          <input
            type="text"
            name="yearAttained"
            value={educationData.yearAttained}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Skills */}
        <label>
          Soft Skills:
          <select
            multiple
            value={skillUserDTO.softSkill}
            onChange={(e) => handleSkillChange(e, 'softSkill')}
          >
            {skillOptions.softSkills.map((skill) => (
              <option key={skill.skillId} value={skill.skillId}>
                {skill.skillName} (ID: {skill.skillId})
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Hard Skills:
          <select
            multiple
            value={skillUserDTO.hardSkill}
            onChange={(e) => handleSkillChange(e, 'hardSkill')}
          >
            {skillOptions.hardSkills.map((skill) => (
              <option key={skill.skillId} value={skill.skillId}>
                {skill.skillName} (ID: {skill.skillId})
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Languages:
          <select
            multiple
            value={skillUserDTO.language}
            onChange={(e) => handleSkillChange(e, 'language')}
          >
            {skillOptions.languages.map((skill) => (
              <option key={skill.skillId} value={skill.skillId}>
                {skill.skillName} (ID: {skill.skillId})
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EducationForm;
