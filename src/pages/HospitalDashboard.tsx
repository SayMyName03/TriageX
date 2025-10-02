import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HospitalHeader from "@/components/HospitalHeader";
import PatientCard from "@/components/PatientCard";
import PatientDetails from "@/components/PatientDetails";
import { Hospital, Patient } from "@/types/patient";

interface HospitalData {
  _id: string;
  name: string;
  email: string;
  address?: string;
  services?: string[];
  contactPhone?: string;
  type: string;
}

// Incoming patients will be populated from alerts (socket + initial fetch)

const HospitalDashboard: React.FC = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [hospitalData, setHospitalData] = useState<HospitalData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const socketRef = useRef<any>(null);
<<<<<<< HEAD
=======
  const audioRef = useRef<HTMLAudioElement | null>(null);
>>>>>>> master
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false);

<<<<<<< HEAD
=======
  // Initialize emergency notification sound
  useEffect(() => {
    audioRef.current = new Audio('/mixkit-urgent-simple-tone-loop-2976.wav');
    audioRef.current.volume = 0.7; // Set to 70% volume
    audioRef.current.preload = 'auto';
    audioRef.current.loop = true; // Loop the sound until manually stopped
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playEmergencySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play().catch(error => {
        console.warn('Could not play emergency notification sound:', error);
      });
    }
  };

  const stopEmergencySound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

>>>>>>> master
  // Fetch authenticated hospital data and set up real-time alert subscription
  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:5001/auth/me", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!mounted || !data?.hospital) return;
        setHospitalData(data.hospital);
        const hospitalInfo: Hospital = {
          name: data.hospital.name,
          location: { lat: 0, lng: 0 },
          totalBeds: 120,
          availableBeds: 28,
          status: "online",
        };
        setHospital(hospitalInfo);
        // dynamic import socket to avoid bundle weight
        import("socket.io-client").then(({ io }) => {
          if (!mounted) return;
          const s = io("http://localhost:5001", { withCredentials: true });
          socketRef.current = s;
          s.emit("joinHospitalRoom", data.hospital._id);
          s.on("alert:new", ({ alert }) => {
            const p = alert.patientSnapshot || {};
            const sevRaw = alert.priority;
            const severity: Patient["severity"] = sevRaw === 'critical' || sevRaw === 'serious' || sevRaw === 'moderate' ? sevRaw : 'moderate';
            const mapped: Patient = {
              id: alert._id,
              ticketNumber: alert._id.slice(-6),
              severity,
              eta: alert.etaSeconds
                ? Math.round(alert.etaSeconds / 60) + " min"
                : "—",
              location: { lat: 0, lng: 0, address: p.additionalInfo || "—" },
              vitals: {
                heartRate: p.heartRate ?? 0,
                bloodPressure: {
                  systolic: p.systolicBP ?? 0,
                  diastolic: p.diastolicBP ?? 0,
                },
                oxygenSaturation: p.oxygenSaturation ?? 0,
                temperature: p.temperature ?? 0,
                respiratoryRate: 0,
              },
              condition: p.symptoms ? p.symptoms.join(", ") : "—",
              ambulanceId: "—",
              age: p.age ?? 0,
              gender: (p.gender === 'M' || p.gender === 'F') ? p.gender : 'M',
              status: alert.status || "incoming",
            };
<<<<<<< HEAD
=======
            
            // Play emergency notification sound for new incoming patient
            playEmergencySound();
            
>>>>>>> master
            setPatients((prev) => [
              mapped,
              ...prev.filter((pt) => pt.id !== mapped.id),
            ]);
          });
        });
        // initial alerts load
        fetch("http://localhost:5001/api/alerts/incoming", {
          credentials: "include",
        })
          .then((r) => (r.ok ? r.json() : []))
          .then((alerts = []) => {
            if (!mounted) return;
            const mapped = alerts.map((alert) => {
              const p = alert.patientSnapshot || {};
              const sevRaw = alert.priority;
              const severity: Patient["severity"] = sevRaw === 'critical' || sevRaw === 'serious' || sevRaw === 'moderate' ? sevRaw : 'moderate';
              const patient: Patient = {
                id: alert._id,
                ticketNumber: alert._id.slice(-6),
                severity,
                eta: alert.etaSeconds
                  ? Math.round(alert.etaSeconds / 60) + " min"
                  : "—",
                location: { lat: 0, lng: 0, address: p.additionalInfo || "—" },
                vitals: {
                  heartRate: p.heartRate ?? 0,
                  bloodPressure: {
                    systolic: p.systolicBP ?? 0,
                    diastolic: p.diastolicBP ?? 0,
                  },
                  oxygenSaturation: p.oxygenSaturation ?? 0,
                  temperature: p.temperature ?? 0,
                  respiratoryRate: 0,
                },
                condition: p.symptoms ? p.symptoms.join(", ") : "—",
                ambulanceId: "—",
                age: p.age ?? 0,
                gender: (p.gender === 'M' || p.gender === 'F') ? p.gender : 'M',
                status: alert.status || "incoming",
              };
              return patient;
            });
            setPatients(mapped);
          });
      })
      .catch(() => {
        if (mounted) navigate("/login");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [navigate]);

  const handleCardClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleRejectPatient = (patientId: string) => {
<<<<<<< HEAD
=======
    // Stop emergency sound when rejecting
    stopEmergencySound();
    // remove the rejected patient from the list so it disappears from the dashboard
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleAcceptPatient = (patientId: string) => {
    // Stop emergency sound when accepting
    stopEmergencySound();
    // Update patient status to arrived and keep in dashboard
    setPatients((prev) => 
      prev.map((p) => 
        p.id === patientId ? { ...p, status: "arrived" } : p
      )
    );
>>>>>>> master
    setModalOpen(false);
    setSelectedPatient(null);
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
=======
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
>>>>>>> master
        <div className="text-lg">Loading hospital dashboard...</div>
      </div>
    );
  }

  if (!hospital || !hospitalData) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
=======
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
>>>>>>> master
        <div className="text-lg text-red-600">
          Failed to load hospital information
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background text-foreground">
      <HospitalHeader hospital={hospital} totalPatients={patients.length} />
      <div className="ml-24 px-1 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Welcome, {hospitalData.name}
          </h2>
          <p className="text-muted-foreground mb-4">
            Hospital Dashboard - Incoming Patients
          </p>
          {hospitalData.address && (
            <p className="text-sm text-muted-foreground">
=======
    <div className="min-h-screen bg-white text-gray-900">
      <HospitalHeader hospital={hospital} totalPatients={patients.length} />
      <div className="ml-24 px-1 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Welcome, {hospitalData.name}
          </h2>
          <p className="text-gray-600 mb-4">
            Hospital Dashboard - Incoming Patients
          </p>
          {hospitalData.address && (
            <p className="text-sm text-gray-600">
>>>>>>> master
              📍 {hospitalData.address}
            </p>
          )}
          {hospitalData.contactPhone && (
<<<<<<< HEAD
            <p className="text-sm text-muted-foreground">
=======
            <p className="text-sm text-gray-600">
>>>>>>> master
              📞 {hospitalData.contactPhone}
            </p>
          )}
        </div>

<<<<<<< HEAD
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Incoming Patients
        </h3>
        <p className="text-muted-foreground mb-6">
=======
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Incoming Patients
        </h3>
        <p className="text-gray-600 mb-6">
>>>>>>> master
          Monitor and manage incoming emergency transfers
        </p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onClick={() => handleCardClick(patient)}
            />
          ))}
        </div>
      </div>
      <PatientDetails
        patient={selectedPatient}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onReject={handleRejectPatient}
<<<<<<< HEAD
=======
        onAccept={handleAcceptPatient}
>>>>>>> master
      />
    </div>
  );
};

export default HospitalDashboard;
