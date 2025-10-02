import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PatientData {
  patientName: string;
  age: string;
  gender: string;
  heartRate: string;
  systolicBP: string;
  diastolicBP: string;
  temperature: string;
  oxygenSaturation: string;
  symptoms: string[];
}

import CriticalityDoughnutChart from "./CriticalityDoughnutChart";

interface PatientDataPreviewProps {
  data: PatientData;
  criticalityScore?: number | null;
  onEdit: () => void;
  onConfirm: () => void;
}

const PatientDataPreview: React.FC<PatientDataPreviewProps> = ({ data, criticalityScore, onEdit, onConfirm }) => {
  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/auth/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login';
    } catch (err) {
      // Optionally show a toast if you have one available
      alert('Logout failed. Please try again.');
    }
  };
  const getVitalStatus = (vital: string, value: string, normalRange: [number, number]) => {
    if (!value) return 'unknown';
    const numValue = parseFloat(value);
    if (numValue < normalRange[0] || numValue > normalRange[1]) {
      return 'abnormal';
    }
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'abnormal': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  // Animation for criticality score
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  useEffect(() => {
    if (typeof criticalityScore === 'number' && !isNaN(criticalityScore) && criticalityScore > 0) {
      let start = 0;
      const duration = 800; // ms
      const stepTime = 16; // ~60fps
      const steps = Math.ceil(duration / stepTime);
      const increment = (criticalityScore - start) / steps;
      let current = start;
      let step = 0;
      const animate = () => {
        step++;
        current += increment;
        if (step < steps) {
          setAnimatedScore(Number(current.toFixed(2)));
          requestAnimationFrame(animate);
        } else {
          setAnimatedScore(Number(criticalityScore));
        }
      };
      animate();
    } else {
      setAnimatedScore(criticalityScore ?? 0);
    }
  }, [criticalityScore]);

  return (
<<<<<<< HEAD
    <Card className="w-full max-w-4xl mx-auto shadow-xl mt-8 bg-background text-foreground">
      <CardHeader className="bg-card border-b border-border flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Patient Data Preview
          </CardTitle>
          <p className="text-muted-foreground mt-2">
=======
    <Card className="w-full max-w-4xl mx-auto shadow-xl mt-8">
      <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Patient Data Preview
          </CardTitle>
          <p className="text-gray-600 mt-2">
>>>>>>> master
            Please review the information before confirming submission
          </p>
        </div>
        <Button onClick={handleLogout} variant="destructive" className="mt-0 ml-4">Logout</Button>
      </CardHeader>
      <CardContent className="p-8">
        {/* Patient Information */}
        <div className="mb-8">
<<<<<<< HEAD
          <h3 className="text-xl font-bold text-foreground mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Name</span>
              <p className="text-lg font-bold text-foreground">{data.patientName || 'Not provided'}</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Age</span>
              <p className="text-lg font-bold text-foreground">{data.age ? `${data.age} years` : 'Not provided'}</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Gender</span>
              <p className="text-lg font-bold text-foreground">{data.gender ? formatGender(data.gender) : 'Not provided'}</p>
=======
          <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Name</span>
              <p className="text-lg font-bold text-gray-900">{data.patientName || 'Not provided'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Age</span>
              <p className="text-lg font-bold text-gray-900">{data.age ? `${data.age} years` : 'Not provided'}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Gender</span>
              <p className="text-lg font-bold text-gray-900">{data.gender ? formatGender(data.gender) : 'Not provided'}</p>
>>>>>>> master
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Vital Signs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Heart Rate</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-foreground">
=======
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Heart Rate</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-gray-900">
>>>>>>> master
                  {data.heartRate ? `${data.heartRate} bpm` : 'Not provided'}
                </p>
                {data.heartRate && (
                  <Badge className={getStatusColor(getVitalStatus('heartRate', data.heartRate, [60, 100]))}>
                    {getVitalStatus('heartRate', data.heartRate, [60, 100])}
                  </Badge>
                )}
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Blood Pressure</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-foreground">
=======
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Blood Pressure</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-gray-900">
>>>>>>> master
                  {data.systolicBP && data.diastolicBP 
                    ? `${data.systolicBP}/${data.diastolicBP} mmHg`
                    : 'Not provided'}
                </p>
                {data.systolicBP && data.diastolicBP && (
                  <Badge className={getStatusColor(
                    getVitalStatus('systolic', data.systolicBP, [90, 140]) === 'normal' &&
                    getVitalStatus('diastolic', data.diastolicBP, [60, 90]) === 'normal'
                      ? 'normal' : 'abnormal'
                  )}>
                    {getVitalStatus('systolic', data.systolicBP, [90, 140]) === 'normal' &&
                     getVitalStatus('diastolic', data.diastolicBP, [60, 90]) === 'normal'
                      ? 'normal' : 'abnormal'}
                  </Badge>
                )}
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Temperature</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-foreground">
=======
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Temperature</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-gray-900">
>>>>>>> master
                  {data.temperature ? `${data.temperature}°C` : 'Not provided'}
                </p>
                {data.temperature && (
                  <Badge className={getStatusColor(getVitalStatus('temperature', data.temperature, [36.0, 37.5]))}>
                    {getVitalStatus('temperature', data.temperature, [36.0, 37.5])}
                  </Badge>
                )}
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-card p-4 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">Oxygen Saturation</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-foreground">
=======
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-600">Oxygen Saturation</span>
              <div className="flex items-center justify-between mt-1">
                <p className="text-lg font-bold text-gray-900">
>>>>>>> master
                  {data.oxygenSaturation ? `${data.oxygenSaturation}%` : 'Not provided'}
                </p>
                {data.oxygenSaturation && (
                  <Badge className={getStatusColor(getVitalStatus('oxygen', data.oxygenSaturation, [95, 100]))}>
                    {getVitalStatus('oxygen', data.oxygenSaturation, [95, 100])}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Reported Symptoms</h3>
<<<<<<< HEAD
          <div className="bg-card p-4 rounded-lg">
=======
          <div className="bg-white p-4 rounded-lg border border-gray-100">
>>>>>>> master
            {data.symptoms.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline" className="text-sm bg-medical-100 text-medical-800 border-medical-300 dark:bg-medical-900 dark:text-medical-200 dark:border-medical-700">
                    {symptom}
                  </Badge>
                ))}
              </div>
            ) : (
<<<<<<< HEAD
              <p className="text-muted-foreground italic">No symptoms reported</p>
=======
              <p className="text-gray-600 italic">No symptoms reported</p>
>>>>>>> master
            )}
          </div>
        </div>

        {/* Criticality Score Chart (always visible on preview) */}
        <div className="flex flex-col items-center mt-10 mb-8 w-full">
<<<<<<< HEAD
          <h3 className="text-2xl font-bold text-foreground-800 mb-2 text-center">Criticality Score</h3>
=======
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Criticality Score</h3>
>>>>>>> master
          <div className="flex flex-col items-center justify-center w-full">
            <div style={{ width: '12rem', height: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #e5e7eb', borderRadius: '1rem', background: '#f9fafb', marginBottom: '0.5rem' }}>
              {typeof criticalityScore === 'number' && !isNaN(criticalityScore) && criticalityScore > 0 ? (
                <CriticalityDoughnutChart score={animatedScore} />
              ) : (
                <span style={{ color: '#64748b', fontWeight: 500 }}>No score available</span>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={onEdit}
            variant="outline"
<<<<<<< HEAD
            className="h-14 px-8 text-lg font-semibold border-2 border-border text-foreground hover:bg-background rounded-xl"
=======
            className="h-14 px-8 text-lg font-semibold border-2 border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl"
>>>>>>> master
          >
            Edit Information
          </Button>
          <Button
            onClick={onConfirm}
            className="h-14 px-8 text-lg font-bold bg-medical-600 hover:bg-medical-700 text-white rounded-xl shadow-lg"
          >
            Continue to Hospital Selection →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDataPreview;
