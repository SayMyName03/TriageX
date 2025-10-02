import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Activity } from "lucide-react";
import { Patient } from "@/types/patient";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  patient: Patient;
  onClick: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  const getSeverityConfig = (severity: Patient["severity"]) => {
    switch (severity) {
      case "critical":
        return {
          className: "patient-critical pulse-critical",
          badge: "bg-critical text-critical-foreground",
          label: "CRITICAL",
        };
      case "serious":
        return {
          className: "patient-serious",
          badge: "bg-serious text-serious-foreground",
          label: "SERIOUS",
        };
      case "moderate":
        return {
          className: "patient-moderate",
          badge: "bg-moderate text-moderate-foreground",
          label: "MODERATE",
        };
    }
  };

  const severityConfig = getSeverityConfig(patient.severity) || {
    className: 'patient-moderate',
    badge: 'bg-moderate text-moderate-foreground',
    label: patient.severity?.toUpperCase?.() || 'MODERATE'
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105 border-2",
<<<<<<< HEAD
        "bg-card hover:bg-card/80 animate-fade-in",
=======
        "bg-white hover:bg-gray-50 animate-fade-in",
>>>>>>> master
        severityConfig.className
      )}
      onClick={() => onClick(patient)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
<<<<<<< HEAD
            <h3 className="font-semibold text-lg text-foreground">
              #{patient.ticketNumber}
            </h3>
            <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
=======
            <h3 className="font-semibold text-lg text-gray-900">
              #{patient.ticketNumber}
            </h3>
            <p className="text-sm text-gray-600">ID: {patient.id}</p>
>>>>>>> master
          </div>
          <Badge className={cn("text-xs font-bold", severityConfig.badge)}>
            {severityConfig.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
<<<<<<< HEAD
            <span className="text-muted-foreground">ETA:</span>
            <span className="font-semibold text-foreground">{patient.eta}</span>
=======
            <span className="text-gray-600">ETA:</span>
            <span className="font-semibold text-gray-900">{patient.eta}</span>
>>>>>>> master
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
<<<<<<< HEAD
            <span className="text-muted-foreground truncate">
=======
            <span className="text-gray-600 truncate">
>>>>>>> master
              {patient.location.address}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Activity className="h-4 w-4 text-primary" />
<<<<<<< HEAD
            <span className="text-muted-foreground">{patient.condition}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex justify-between text-xs text-muted-foreground">
=======
            <span className="text-gray-600">{patient.condition}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-600">
>>>>>>> master
            <span>
              {patient.age}y {patient.gender}
            </span>
            <span>Unit {patient.ambulanceId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
