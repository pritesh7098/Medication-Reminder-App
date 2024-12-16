// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonChip,
  IonRefresher,
  IonRefresherContent,
  useIonToast,
} from "@ionic/react";
import { add, checkmark, refreshCircle } from "ionicons/icons";
import { useAuth } from "../context/AuthContext";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  schedule_time: string;
  recurring_days: number[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    dosage: "",
    schedule_time: "",
    recurring_days: [] as number[],
  });
  const [present] = useIonToast();
  const [acknowledgedMeds, setAcknowledgedMeds] = useState<number[]>([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/medicines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const handleAddMedicine = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMedicine),
      });

      if (response.ok) {
        setShowModal(false);
        fetchMedicines();
        setNewMedicine({
          name: "",
          dosage: "",
          schedule_time: "",
          recurring_days: [],
        });
        present({
          message: "Medicine added successfully!",
          duration: 2000,
          position: "top",
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      present({
        message: "Failed to add medicine. Please try again.",
        duration: 2000,
        position: "top",
        color: "danger",
      });
    }
  };

  const handleAcknowledgment = async (medicineId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/acknowledgments/log",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            medicineId,
            status: "taken",
          }),
        }
      );

      if (response.ok) {
        setAcknowledgedMeds([...acknowledgedMeds, medicineId]);
        present({
          message: "Medicine marked as taken successfully!",
          duration: 2000,
          position: "top",
          color: "success",
        });
      }
    } catch (error) {
      console.error("Error acknowledging medicine:", error);
      present({
        message: "Failed to acknowledge medicine. Please try again.",
        duration: 2000,
        position: "top",
        color: "danger",
      });
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await fetchMedicines();
    event.detail.complete();
  };

  const getDayNames = (days: number[]) => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => dayNames[day - 1]).join(", ");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Medicine Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={refreshCircle}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>

        <IonGrid>
          {medicines.map((medicine) => (
            <IonRow key={medicine.id}>
              <IonCol>
                <IonCard className="medicine-card">
                  <IonCardContent>
                    <IonGrid>
                      <IonRow className="ion-align-items-center">
                        <IonCol size="8">
                          <h2 className="medicine-title">{medicine.name}</h2>
                          <div className="medicine-info">
                            <IonChip color="primary">
                              <IonLabel>Dosage: {medicine.dosage}</IonLabel>
                            </IonChip>
                            <IonChip color="secondary">
                              <IonLabel>
                                Time: {medicine.schedule_time}
                              </IonLabel>
                            </IonChip>
                          </div>
                          <p className="recurring-days">
                            <IonBadge color="tertiary">
                              Days: {getDayNames(medicine.recurring_days)}
                            </IonBadge>
                          </p>
                        </IonCol>
                        <IonCol size="4" className="ion-text-end">
                          <IonButton
                            onClick={() => handleAcknowledgment(medicine.id)}
                            color={
                              acknowledgedMeds.includes(medicine.id)
                                ? "success"
                                : "medium"
                            }
                            fill={
                              acknowledgedMeds.includes(medicine.id)
                                ? "solid"
                                : "outline"
                            }
                            disabled={acknowledgedMeds.includes(medicine.id)}
                          >
                            <IonIcon icon={checkmark} slot="start" />
                            {acknowledgedMeds.includes(medicine.id)
                              ? "Taken"
                              : "Mark as taken"}
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}

          {medicines.length === 0 && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <p>No medicines scheduled. Add your first medicine!</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add New Medicine</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Medicine Name</IonLabel>
                <IonInput
                  value={newMedicine.name}
                  onIonChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      name: e.detail.value!,
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Dosage</IonLabel>
                <IonInput
                  value={newMedicine.dosage}
                  onIonChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      dosage: e.detail.value!,
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Schedule Time</IonLabel>
                <IonInput
                  type="time"
                  value={newMedicine.schedule_time}
                  onIonChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      schedule_time: e.detail.value!,
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Recurring Days</IonLabel>
                <IonSelect
                  multiple={true}
                  value={newMedicine.recurring_days}
                  onIonChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      recurring_days: e.detail.value,
                    })
                  }
                >
                  <IonSelectOption value={1}>Monday</IonSelectOption>
                  <IonSelectOption value={2}>Tuesday</IonSelectOption>
                  <IonSelectOption value={3}>Wednesday</IonSelectOption>
                  <IonSelectOption value={4}>Thursday</IonSelectOption>
                  <IonSelectOption value={5}>Friday</IonSelectOption>
                  <IonSelectOption value={6}>Saturday</IonSelectOption>
                  <IonSelectOption value={7}>Sunday</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <IonButton
              expand="block"
              className="ion-margin"
              onClick={handleAddMedicine}
            >
              Add Medicine
            </IonButton>
            <IonButton
              expand="block"
              className="ion-margin"
              color="medium"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </IonButton>
          </IonContent>
        </IonModal>

        <style>
          {`
            .medicine-card {
              margin: 1rem;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .medicine-title {
              font-size: 1.2rem;
              font-weight: 600;
              color: var(--ion-color-dark);
              margin-bottom: 0.5rem;
            }

            .medicine-info {
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
              margin-bottom: 0.5rem;
            }

            .recurring-days {
              margin-top: 0.5rem;
            }

            ion-chip {
              --background: var(--ion-color-light);
            }

            ion-badge {
              padding: 8px 12px;
              border-radius: 16px;
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
