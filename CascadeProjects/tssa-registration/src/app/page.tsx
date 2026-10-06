'use client';

import { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nin: '',
    ageCategory: '',
    position: '',
    dominantLeg: '',
    lockerNumber: '',
    shoeSize: '',
    height: '',
    weight: '',
    address: '',
    hobbies: '',
    parentFirstName: '',
    parentLastName: '',
    parentDateOfBirth: '',
    parentConsentAgreement: false,
    schools: [{ schoolName: '', level: '', startDate: '', endDate: '' }],
    trainingKitPickupDate: '',
    trainingKitPickupTime: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });

  const [files, setFiles] = useState<{
    transcript: File | null;
    passportPhoto: File | null;
    otherDocuments: File | null;
    parentPhoto: File | null;
    birthCertificate: File | null;
    ninDocument: File | null;
    parentConsentForm: File | null;
    medicalForms: File | null;
  }>({
    transcript: null,
    passportPhoto: null,
    otherDocuments: null,
    parentPhoto: null,
    birthCertificate: null,
    ninDocument: null,
    parentConsentForm: null,
    medicalForms: null,
  });

  const playerCanvasRef = useRef<HTMLCanvasElement>(null);
  const parentCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentCanvas, setCurrentCanvas] = useState<'player' | 'parent' | null>(null);

  useEffect(() => {
    const playerCanvas = playerCanvasRef.current;
    const parentCanvas = parentCanvasRef.current;
    
    if (playerCanvas && parentCanvas) {
      const playerCtx = playerCanvas.getContext('2d');
      const parentCtx = parentCanvas.getContext('2d');
      
      if (playerCtx && parentCtx) {
        playerCanvas.width = playerCanvas.offsetWidth;
        playerCanvas.height = playerCanvas.offsetHeight;
        parentCanvas.width = parentCanvas.offsetWidth;
        parentCanvas.height = parentCanvas.offsetHeight;
        
        playerCtx.strokeStyle = '#0066cc';
        playerCtx.lineWidth = 2;
        playerCtx.lineCap = 'round';
        
        parentCtx.strokeStyle = '#0066cc';
        parentCtx.lineWidth = 2;
        parentCtx.lineCap = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>, canvasType: 'player' | 'parent') => {
    setIsDrawing(true);
    setCurrentCanvas(canvasType);
    const canvas = canvasType === 'player' ? playerCanvasRef.current : parentCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentCanvas) return;
    const canvas = currentCanvas === 'player' ? playerCanvasRef.current : parentCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setCurrentCanvas(null);
  };

  const clearPlayerSignature = () => {
    const canvas = playerCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const clearParentSignature = () => {
    const canvas = parentCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSchoolChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      schools: prev.schools.map((school, i) => 
        i === index ? { ...school, [field]: value } : school
      )
    }));
  };

  const addSchool = () => {
    setFormData(prev => ({
      ...prev,
      schools: [...prev.schools, { schoolName: '', level: '', startDate: '', endDate: '' }]
    }));
  };

  const removeSchool = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schools: prev.schools.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Files:', files);
    alert('Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50">
      <Navigation />
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl mb-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Registration Open</h2>
                  <p className="text-green-100">New player applications accepted</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-100">Maximum Academy Capacity</p>
                <p className="text-3xl font-bold">231 Players</p>
              </div>
            </div>
            <div className="border-t border-green-400 pt-4 mt-4">
              <p className="text-green-50 leading-relaxed">
                Welcome to TSSA - Tripple Starts Soccer Academy. We are dedicated to developing young soccer talent through professional training and competitive play. Our academy provides comprehensive player development programs for all age groups.
              </p>
              <p className="text-green-50 leading-relaxed mt-2">
                Registration automatically closes when academy capacity reaches 231 registered players. The only open positions we have are by tryout and that's 35 new players (5 players from each under category). Further communications will be passed on. Expect re-opening 06OCT2026 for a new cohort.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center">
              <h1 className="text-4xl font-bold mb-2">TSSA Player Registration Portal</h1>
              <p className="text-lg opacity-90">Complete your registration to join TSSA</p>
            </div>

            <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">First Name <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Last Name <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Date of Birth <span className="text-orange-500">*</span></label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">NIN (National ID) <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    name="nin"
                    value={formData.nin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Age Category <span className="text-orange-500">*</span></label>
                  <select
                    name="ageCategory"
                    value={formData.ageCategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  >
                    <option value="">Select Age Category</option>
                    <option value="UNDER_10">Under 10</option>
                    <option value="UNDER_12_14">Under 12-14</option>
                    <option value="UNDER_15_16">Under 15-16</option>
                    <option value="UNDER_17">Under 17</option>
                    <option value="UNDER_18">Under 18</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Position <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Dominant Leg <span className="text-orange-500">*</span></label>
                  <select
                    name="dominantLeg"
                    value={formData.dominantLeg}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  >
                    <option value="">Select dominant leg</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Locker Number</label>
                  <input
                    type="number"
                    name="lockerNumber"
                    value={formData.lockerNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Shoe Size</label>
                  <input
                    type="text"
                    name="shoeSize"
                    value={formData.shoeSize}
                    onChange={handleInputChange}
                    placeholder="e.g., US 10, EU 43"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="e.g., 5'10&quot; or 178 cm"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 150 lbs or 68 kg"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Address <span className="text-orange-500">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-2">Hobbies</label>
              <textarea
                name="hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                placeholder="List your hobbies and interests..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all min-h-[100px] resize-y"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Document Uploads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Passport Photo <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="passportPhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="passportPhoto"
                    />
                    <label htmlFor="passportPhoto" className="cursor-pointer text-gray-600 font-medium">
                      {files.passportPhoto ? files.passportPhoto.name : 'Click to upload passport photo'}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Birth Certificate <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="birthCertificate"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="birthCertificate"
                    />
                    <label htmlFor="birthCertificate" className="cursor-pointer text-gray-600 font-medium">
                      {files.birthCertificate ? files.birthCertificate.name : 'Click to upload birth certificate'}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">NIN Document <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="ninDocument"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="ninDocument"
                    />
                    <label htmlFor="ninDocument" className="cursor-pointer text-gray-600 font-medium">
                      {files.ninDocument ? files.ninDocument.name : 'Click to upload NIN document'}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Transcript <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="transcript"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="transcript"
                    />
                    <label htmlFor="transcript" className="cursor-pointer text-gray-600 font-medium">
                      {files.transcript ? files.transcript.name : 'Click to upload transcript'}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Medical Forms <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="medicalForms"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="medicalForms"
                    />
                    <label htmlFor="medicalForms" className="cursor-pointer text-gray-600 font-medium">
                      {files.medicalForms ? files.medicalForms.name : 'Click to upload medical forms'}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2">Other Documents</label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="otherDocuments"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      className="hidden"
                      id="otherDocuments"
                    />
                    <label htmlFor="otherDocuments" className="cursor-pointer text-gray-600 font-medium">
                      {files.otherDocuments ? files.otherDocuments.name : 'Click to upload other documents'}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Schools Attended</h2>
              <div className="space-y-4">
                {formData.schools.map((school, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">School Name <span className="text-orange-500">*</span></label>
                        <input
                          type="text"
                          value={school.schoolName}
                          onChange={(e) => handleSchoolChange(index, 'schoolName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                          placeholder="School name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">Level/Grade <span className="text-orange-500">*</span></label>
                        <input
                          type="text"
                          value={school.level}
                          onChange={(e) => handleSchoolChange(index, 'level', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                          placeholder="e.g., Grade 10, High School"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">Start Date <span className="text-orange-500">*</span></label>
                        <input
                          type="date"
                          value={school.startDate}
                          onChange={(e) => handleSchoolChange(index, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-semibold mb-2">End Date <span className="text-orange-500">*</span></label>
                        <input
                          type="date"
                          value={school.endDate}
                          onChange={(e) => handleSchoolChange(index, 'endDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                        />
                      </div>
                    </div>
                    {formData.schools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSchool(index)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                      >
                        Remove School
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSchool}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  + Add Another School
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Training Kit Pickup</h2>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                <p className="text-gray-700 mb-4">
                  Please select your preferred date and time to pick up your training kit at the TSSA facility. 
                  Training kits include jersey, shorts, socks, and necessary equipment for your position.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Pickup Date <span className="text-orange-500">*</span></label>
                    <input
                      type="date"
                      name="trainingKitPickupDate"
                      value={formData.trainingKitPickupDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Pickup Time <span className="text-orange-500">*</span></label>
                    <select
                      name="trainingKitPickupTime"
                      value={formData.trainingKitPickupTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    >
                      <option value="">Select pickup time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  * Facility hours: Monday - Friday, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Emergency Contact</h2>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-6">
                <p className="text-gray-700 mb-4">
                  Please provide an emergency contact in case we cannot reach the parent/guardian. 
                  This person should be authorized to make decisions on behalf of the player in emergency situations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Emergency Contact Name <span className="text-orange-500">*</span></label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Phone Number <span className="text-orange-500">*</span></label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                      placeholder="e.g., +1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Relationship to Player <span className="text-orange-500">*</span></label>
                    <input
                      type="text"
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                      placeholder="e.g., Grandparent, Aunt, Family Friend"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-2 border-b-3 border-orange-500">Signatures</h2>
              <div className="bg-blue-100 p-6 rounded-xl mb-6">
                <h3 className="text-blue-600 font-bold mb-4">Player Signature</h3>
                <canvas
                  ref={playerCanvasRef}
                  className="w-full h-[150px] border-2 border-blue-600 rounded-lg bg-white cursor-crosshair"
                  onMouseDown={(e) => startDrawing(e, 'player')}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={clearPlayerSignature}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="bg-blue-100 p-6 rounded-xl">
                <h3 className="text-blue-600 font-bold mb-4">Parent/Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Parent/Guardian First Name</label>
                    <input
                      type="text"
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Parent/Guardian Last Name</label>
                    <input
                      type="text"
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2">Parent/Guardian Date of Birth</label>
                    <input
                      type="date"
                      name="parentDateOfBirth"
                      value={formData.parentDateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">Parent/Guardian Photo</label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="parentPhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="parentPhoto"
                    />
                    <label htmlFor="parentPhoto" className="cursor-pointer text-gray-600 font-medium">
                      {files.parentPhoto ? files.parentPhoto.name : 'Click to upload parent/guardian photo'}
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">Parent Consent Form <span className="text-orange-500">*</span></label>
                  <div className="border-2 border-dashed border-orange-500 rounded-lg p-5 text-center bg-yellow-50 hover:bg-yellow-100 transition-all cursor-pointer">
                    <input
                      type="file"
                      name="parentConsentForm"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="parentConsentForm"
                    />
                    <label htmlFor="parentConsentForm" className="cursor-pointer text-gray-600 font-medium">
                      {files.parentConsentForm ? files.parentConsentForm.name : 'Click to upload signed parent consent form'}
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">Consent Form</label>
                  <div className="bg-yellow-50 p-5 rounded-lg border-2 border-orange-500 mb-4">
                    <h4 className="text-blue-600 font-bold mb-3">Parent/Guardian Consent Agreement</h4>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      I, as the parent or legal guardian of the player named above, hereby consent to my child's participation in TSSA activities. 
                      I understand the risks involved in sports activities and agree to release TSSA, its coaches, and officials from any liability 
                      for injuries that may occur during participation. I authorize TSSA staff to seek medical treatment for my child in case 
                      of emergency and agree to all rules and regulations of the organization.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      I also grant permission for TSSA to use photographs and videos of my child for promotional purposes.
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="parentConsentAgreement"
                      checked={formData.parentConsentAgreement}
                      onChange={handleInputChange}
                      className="w-5 h-5 mr-3"
                    />
                    <span className="text-gray-600">I have read and agree to the consent form above <span className="text-orange-500">*</span></span>
                  </label>
                </div>

                <h3 className="text-blue-600 font-bold mb-4 mt-6">Parent/Guardian Signature</h3>
                <canvas
                  ref={parentCanvasRef}
                  className="w-full h-[150px] border-2 border-blue-600 rounded-lg bg-white cursor-crosshair"
                  onMouseDown={(e) => startDrawing(e, 'parent')}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={clearParentSignature}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold text-lg hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </div>
  );
}
