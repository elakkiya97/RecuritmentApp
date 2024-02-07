import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import customLogo from '../Component/mainlogo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Component/css/Applicant.css'
import { Steps, Input, Button, Radio, Select, DatePicker } from 'antd'
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit'

const API_BASE_URL = 'http://localhost:5042'

const applicantFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}

const imageStyle = {
  display: 'block',
  margin: '0 auto',
  width: '260px',
  height: 'auto'
}

const imageStyle1 = {
  display: 'block',
  width: '100%',
  height: 'auto',
  marginTop: '40px',
}
const { Option } = Select

const ApplicantForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedStep, setSelectedStep] = useState(0)
  const [applicantData, setApplicantData] = useState({
    title: '',
    dob: null,
    gender: '',
    phoneNo: '',
    email: '',
    countryCode: '',
    country: '',
    city: '',
    street: '',
    state: '',
    zip: '',
    permanentAddress: '',
    residentialAddress: '',
  })
  const [ExperienceData, setExperienceData] = useState({
    currentstatus: '',
    qualifications: [],
    fieldOfStudy: '',
    yearAttained: '',
    motherLanguage: '',
    softSkills: [],
    hardSkills: [],
    cv: null,
  })

  const location = useLocation()
  const jwtToken = location.state ? location.state.token : null

  const handleChange = (name, value) => {
    setApplicantData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleChangeStep = (index) => {
    setCurrentStep(index)
    setSelectedStep(index)
  }

  const handleNext = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Applicant/app`,
        applicantData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log('Applicant created:', response.data);
    } catch (error) {
      console.error('Error creating applicant:', error);
    }
  }
  const handleCancel = () => {
    // Implement logic to handle cancellation, for example, redirecting to another page or clearing the form data
    console.log('Cancellation logic goes here');
  }

  const stepTitles = [
    'Personal Details',
    'Experience Details',
    'Application Questions',
    'Acknowledgement',
    'Reviews',
  ]

  const handleFileChange = (field, file) => {
    setExperienceData({
      ...ExperienceData,
      [field]: file,
    })
  }

  return (
    <div className="applicant-form-page" style={applicantFormStyle}>
      <header className="header">
        <img src={customLogo} alt="Custom Logo" style={imageStyle} />
      </header>
      <Steps
        current={currentStep}
        percent={60}
        style={{
          padding: '10px 0',
          width: '90%',
          display: 'block',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          top: '-80px',
        }}
        items={stepTitles.map((title) => ({
          title,
        }))}
        itemRender={(item) => (
          <Steps.Item
            {...item}
            title={<span style={{ color: 'blue' }}>{item.title}</span>}
          />
        )}
      />
      <main className="main">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6" className="login-section" style={{ flexBasis: '35%', minHeight: '100vh' }}>
                <h1 className="application">
                  {stepTitles[currentStep]}
                </h1>
                <MDBCardImage
                  src={process.env.PUBLIC_URL + '/login.png'}
                  alt="login form"
                  style={imageStyle1}
                />
                <h3 className="h3">
                </h3>
                <ol className="applicant-list">
                  <li className="li">
                    Make your resume public to be visible to Hiring Employees.
                  </li>
                  <li className="li">
                    Speed up the application process with quick apply. You can
                    apply to jobs with just one click?
                  </li>
                  <li className="li">
                    See similar job titles and skills to help you make your
                    next move.
                  </li>
                </ol>
              </MDBCol>
              <MDBCol md="6" className="form-section" style={{ flexBasis: '65%', minHeight: '100vh' }}>
                <div>
                  <ul className="horizontal-list">
                    {stepTitles.map((title, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangeStep(index)}
                        className={index === selectedStep ? 'active-step' : ''}
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={handleSubmit}>
                    {currentStep === 0 && (
                      <div className="container" style={{ marginTop: '30px' }}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                Title:
                              </label>
                              <Select
                                id="title"
                                name="tilte"

                                value={ExperienceData.currentstatus}
                                onChange={(value) => handleChange('title', value)}
                                className="form-control"
                                placeholder="Title"
                              >
                                <Option value="Mr">Mr</Option>
                                <Option value="Mrs">Mrs</Option>
                                <Option value="Ms">Ms</Option>
                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="firstName" className="form-label">
                                First Name:
                              </label>
                              <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={applicantData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="form-control"
                                placeholder="First Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="lastName" className="form-label">
                                Last Name:
                              </label>
                              <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={applicantData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="form-control"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email:
                              </label>
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={applicantData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="form-control"
                                placeholder="Email"

                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="gender" className="form-label">
                                Gender:
                              </label>
                              <Radio.Group
                                id="gender"
                                name="gender"
                                value={applicantData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                              >
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                DOB:
                              </label>
                              <DatePicker
                                id="dob"
                                name="dob"
                                value={applicantData.dob}
                                onChange={(date, dateString) => handleChange('dob', dateString)}
                                className="form-control"
                                placeholder="Date of Birth"
                                style={{ width: '100%' }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="phoneNo" className="form-label">
                                Phone Number:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Select
                                  id="countryCode"
                                  name="countryCode"
                                  value={applicantData.countryCode}
                                  onChange={(value) => handleChange('countryCode', value)}
                                  className="form-control"
                                  style={{ flex: 1, marginRight: '10px' }}
                                >
                                  <Option value="+1">+1 (United States)</Option>
                                  <Option value="+44">+44 (United Kingdom)</Option>
                                </Select>
                                <Input
                                  type="tel"
                                  id="phoneNo"
                                  name="phoneNo"
                                  value={applicantData.phoneNo}
                                  onChange={(e) => handleChange('phoneNo', e.target.value)}
                                  className="form-control"
                                  style={{ flex: 2 }}
                                  placeholder="Phone Number"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="country" className="form-label">
                                Country:
                              </label>
                              <Input
                                type="text"
                                id="country"
                                name="country"
                                value={applicantData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                                className="form-control"
                                placeholder="Country"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="state" className="form-label">
                                State:
                              </label>
                              <Input
                                type="text"
                                id="state"
                                name="state"
                                value={applicantData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                                className="form-control"
                                placeholder="State"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="city" className="form-label">
                                City:
                              </label>
                              <Input
                                type="text"
                                id="city"
                                name="city"
                                value={applicantData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                className="form-control"
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="street" className="form-label">
                                Street:
                              </label>
                              <Input
                                type="text"
                                id="street"
                                name="street"
                                value={applicantData.street}
                                onChange={(e) => handleChange('street', e.target.value)}
                                className="form-control"
                                placeholder="Street"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="zip" className="form-label">
                                Postal Code:
                              </label>
                              <Input
                                type="text"
                                id="zip"
                                name="zip"
                                value={applicantData.zip}
                                onChange={(e) => handleChange('zip', e.target.value)}
                                className="form-control"
                                placeholder="Postal Code"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="permanentAddress" className="form-label">
                                Permanent Address:
                              </label>
                              <Input
                                type="text"
                                id="permanentAddress"
                                name="permanentAddress"
                                value={applicantData.permanentAddress}
                                onChange={(e) => handleChange('permanentAddress', e.target.value)}
                                className="form-control"
                                placeholder="Permanent Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="residentialAddress" className="form-label">
                                Residential Address:
                              </label>
                              <Input
                                type="text"
                                id="residentialAddress"
                                name="residentialAddress"
                                value={applicantData.residentialAddress}
                                onChange={(e) => handleChange('residentialAddress', e.target.value)}
                                className="form-control"
                                placeholder="Residential Address"
                              />
                            </div>
                          </div>
                          <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
                            {currentStep > 0 && (
                              <Button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="btn btn-secondary"
                              >
                                Back
                              </Button>
                            )}
                            {currentStep < stepTitles.length - 1 && (
                              <Button
                                type="button"
                                onClick={handleNext}
                                className="btn btn-primary"
                              >
                                Next
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {currentStep === 1 && (
                      <div className="container" style={{ marginTop: '30px' }}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="current status" className="form-label">
                                Current Status:
                              </label>
                              <Select
                                id="current status"
                                name="current status"

                                value={ExperienceData.currentStatus}
                                onChange={(value) => handleChange('currentStatus', value)}
                                className="form-control"
                                placeholder="Current Status"
                              >
                                <Option value="Student">Student</Option>
                                <Option value="Employed">Employed</Option>

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="qualifications" className="form-label">
                                Qualifications:
                              </label>
                              <Select
                                id="qualifications"
                                name="qualifications"
                                mode="multiple"
                                value={ExperienceData.Qualifications}
                                onChange={(value) => handleChange('Qualifications', value)}
                                className="form-control"
                                placeholder="Qualifications"
                              >
                                <Option value="Bachelor">Bachelor</Option>
                                <Option value="Master">Master</Option>

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="fieldOfStudy" className="form-label">
                                Field of Study:
                              </label>
                              <Input
                                type="text"
                                id="fieldOfStudy"
                                name="fieldOfStudy"
                                value={ExperienceData.FieldOfStudy}
                                onChange={(e) => handleChange('FieldOfStudy', e.target.value)}
                                className="form-control"
                                placeholder="Field of Study"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="university" className="form-label">
                                University:
                              </label>
                              <Input
                                type="text"
                                id="university"
                                name="university"
                                value={ExperienceData.university}
                                onChange={(e) => handleChange('university', e.target.value)}
                                className="form-control"
                                placeholder="University"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="yearAttained" className="form-label">
                                Year Attained:
                              </label>
                              <Input
                                type="text"
                                id="yearAttained"
                                name="yearAttained"
                                value={ExperienceData.YearAttained}
                                onChange={(e) => handleChange('YearAttained', e.target.value)}
                                className="form-control"
                                placeholder="Year Attained"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="additionalQualification" className="form-label">
                                Additional Qualification:
                              </label>
                              <Select
                                id="additionalQualification"
                                name="additionalQualification"
                                mode="multiple"
                                value={ExperienceData.additionalQualification}
                                onChange={(value) => handleChange('additionalQualification', value)}
                                className="form-control"
                                placeholder="Additional Qualification"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="motherLanguage" className="form-label">
                                Mother Language:
                              </label>
                              <Input
                                type="text"
                                id="motherLanguage"
                                name="motherLanguage"
                                value={ExperienceData.motherLanguage}
                                onChange={(e) => handleChange('motherLanguage', e.target.value)}
                                className="form-control"
                                placeholder="Mother Language"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="additionalKnownLanguages" className="form-label">
                                Additional Known Languages:
                              </label>
                              <Select
                                id="additionalKnownLanguages"
                                name="additionalKnownLanguages"
                                mode="multiple"
                                value={ExperienceData.additionalKnownLanguages}
                                onChange={(value) => handleChange('additionalKnownLanguages', value)}
                                className="form-control"
                                placeholder="Additional Known Languages"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="softSkills" className="form-label">
                                Soft Skills:
                              </label>
                              <Select
                                id="softSkills"
                                name="softSkills"
                                mode="multiple"
                                value={ExperienceData.softSkills}
                                onChange={(value) => handleChange('softSkills', value)}
                                className="form-control"
                                placeholder="Soft Skills"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="hardSkills" className="form-label">
                                Hard Skills:
                              </label>
                              <Select
                                id="hardSkills"
                                name="hardSkills"
                                mode="multiple"
                                value={ExperienceData.hardSkills}
                                onChange={(value) => handleChange('hardSkills', value)}
                                className="form-control"
                                placeholder="Hard Skills"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
                            {currentStep > 0 && (
                              <Button type="button" onClick={handleBack} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                                Back
                              </Button>
                            )}
                            {currentStep < stepTitles.length - 1 && (
                              <Button type="button" onClick={handleNext} className="btn btn-primary">
                                Next
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="container" style={{ marginTop: '30px' }}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="referee name" className="form-label">
                                Referee Name:
                              </label>
                              <Input
                                type="text"
                                id="referee name"
                                name="referee name"
                                value={ExperienceData.refereename}
                                onChange={(e) => handleChange('referee name', e.target.value)}
                                className="form-control"
                                placeholder="Referee name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="refereephoneNo" className="form-label">
                                Referee PhoneNumber:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Select
                                  id="countryCode"
                                  name="countryCode"
                                  value={applicantData.countryCode}
                                  onChange={(value) => handleChange('countryCode', value)}
                                  className="form-control"
                                  style={{ flex: 1, marginRight: '10px' }}
                                >
                                  <Option value="+1">+1 (United States)</Option>
                                  <Option value="+44">+44 (United Kingdom)</Option>

                                </Select>
                                <Input
                                  type="tel"
                                  id="refereephoneNo"
                                  name="refereephoneNo"
                                  value={applicantData.phoneNo}
                                  onChange={(e) => handleChange('prefereephoneNo', e.target.value)}
                                  className="form-control"
                                  style={{ flex: 2 }}
                                  placeholder="Referee Phone Number"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="referee Address" className="form-label">
                                Referee Address:
                              </label>
                              <Input
                                type="text"
                                id="referee Address"
                                name="referee Address"
                                value={ExperienceData.fieldOfStudy}
                                onChange={(e) => handleChange('referee Address', e.target.value)}
                                className="form-control"
                                placeholder="Referee Address"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor=" desiredLocation" className="form-label">
                                Desired Location:
                              </label>
                              <Select
                                id="desiredLocation"
                                name="desiredLocation"
                                mode="multiple"
                                value={ExperienceData.desiredLocation}
                                onChange={(value) => handleChange('desiredLocation', value)}
                                className="form-control"
                                placeholder="Desired Location"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="yearAttained" className="form-label">
                                Where did you hear about this opportunity?
                              </label>
                              <Select
                                id="desiredLocation"
                                name="desiredLocation"
                                mode="multiple"
                                value={ExperienceData.desiredLocation}
                                onChange={(value) => handleChange('desiredLocation', value)}
                                className="form-control"
                                placeholder=" Where did you hear about this opportunity?"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="additionalQualification" className="form-label">
                                When are you ready to start?
                              </label>
                              <Input
                                type="text"
                                id="motherLanguage"
                                name="motherLanguage"
                                value={ExperienceData.motherLanguage}
                                onChange={(e) => handleChange('motherLanguage', e.target.value)}
                                className="form-control"
                                placeholder=" When are you ready to start?"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="additionalKnownLanguages" className="form-label">
                                Preferred Contact Method
                              </label>
                              <Select
                                id="additionalKnownLanguages"
                                name="additionalKnownLanguages"
                                mode="multiple"
                                value={ExperienceData.additionalKnownLanguages}
                                onChange={(value) => handleChange('additionalKnownLanguages', value)}
                                className="form-control"
                                placeholder=" Preferred Contact Method"
                              >

                              </Select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="gender" className="form-label">
                                Are you looking for a full-time permanent position?
                              </label>
                              <Radio.Group
                                id="gender"
                                name="gender"
                                value={applicantData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                              >
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="col-md-12 text-center">
                            <div className="mb-3">
                              <label htmlFor="cvUpload" className="form-label">Upload CV:</label>
                              <input
                                type="file"
                                id="cvUpload"
                                name="cvUpload"
                                onChange={(e) => handleFileChange('cv', e.target.files[0])}
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
                            {currentStep > 0 && (
                              <Button type="button" onClick={handleBack} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                                Back
                              </Button>
                            )}
                            {currentStep < stepTitles.length - 1 && (
                              <Button type="button" onClick={handleNext} className="btn btn-primary">
                                Next
                              </Button>
                            )}
                          </div>

                        </div>
                      </div>
                    )
                    }

                    {currentStep === 3 && (
                      <div className="container" style={{ marginTop: '70px' }}>
                        <div className="row mx-auto">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <input
                                type="checkbox"
                                id="keepAccountOpen"
                                name="keepAccountOpen"
                                checked={ExperienceData.keepAccountOpen}
                                onChange={(e) => handleChange('keepAccountOpen', e.target.checked)}
                              />
                              <label htmlFor="keepAccountOpen" className="form-label" style={{ marginLeft: '8px' }}> I want you to keep my account open for twelve months</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="mb-3">
                              <input
                                type="checkbox"
                                id="receiveInterestingInfo"
                                name="receiveInterestingInfo"
                                checked={ExperienceData.receiveInterestingInfo}
                                onChange={(e) => handleChange('receiveInterestingInfo', e.target.checked)}
                              />
                              <label htmlFor="receiveInterestingInfo" className="form-label" style={{ marginLeft: '8px' }}> I am happy to receive other interesting information</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="mb-3">
                              <input
                                type="checkbox"
                                id="agreeTermsConditions"
                                name="agreeTermsConditions"
                                checked={ExperienceData.agreeTermsConditions}
                                onChange={(e) => handleChange('agreeTermsConditions', e.target.checked)}
                              />
                              <label htmlFor="agreeTermsConditions" className="form-label" style={{ marginLeft: '8px' }}> Yes, I agree to the terms & conditions</label>
                            </div>
                          </div>


                          <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
                            {currentStep > 0 && (
                              <Button type="button" onClick={handleBack} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                                Back
                              </Button>
                            )}
                            {currentStep < stepTitles.length - 1 && (
                              <Button type="button" onClick={handleNext} className="btn btn-primary">
                                Next
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  {currentStep === 4 && (
  <div className="container" style={{ marginTop: '70px' }}>
    <div className="row mx-auto">
      <div className="col-md-12">
        <h3 className="form-labels">My Information</h3>
        <table className="table table-borderless">
          <tbody>
          <tr>
              <td>
                <label htmlFor="dob" className="form-label">Name:</label>
              </td>
             
            </tr>
            <tr>
              <td>
                <label htmlFor="gender" className="form-label">Gender:</label>
              </td>
              
            </tr>
            <tr>
              <td>
                <label htmlFor="dob" className="form-label">Date of Birth:</label>
              </td>
             
            </tr>
            {/* Add more rows for other fields (Address, Phone Number, Email, CV, etc.) */}
            <tr>
              <td>
                <label htmlFor="dob" className="form-label">Address:</label>
              </td>
             
            </tr>
            <tr>
              <td>
                <label htmlFor="dob" className="form-label">Phone Number:</label>
              </td>
             
            </tr>
            <tr>
              <td>
                <label htmlFor="dob" className="form-label">Email Address:</label>
              </td>
             
            </tr>
            <tr>
              <td>
                <label htmlFor="dob" className="form-label">Your Cv:</label>
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div className="col-md-12" style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </Button>
      
      
      </div>
    </div>
  </div>
)}/

                  </form>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </main>
    </div>
  )
}

export default ApplicantForm