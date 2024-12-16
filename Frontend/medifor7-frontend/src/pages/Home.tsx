// src/pages/Home.tsx
import React from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { medkit, time, notifications, peopleCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>MediFor7 - Your Medicine Companion</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Hero Section */}
        <div className="hero-section ion-text-center ion-padding">
          <h1>Take Control of Your Medical Schedule</h1>
          <p>Never miss your medications with our smart reminder system</p>
          <IonButton
            size="large"
            onClick={() => history.push("/register")}
            className="ion-margin"
          >
            Register{" "}
          </IonButton>
          <IonButton
            size="large"
            fill="outline"
            onClick={() => history.push("/login")}
            className="ion-margin"
          >
            Login
          </IonButton>
        </div>

        {/* Features Section */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard>
                <IonCardHeader>
                  <IonIcon
                    icon={medkit}
                    color="primary"
                    style={{ fontSize: "2rem" }}
                  />
                  <IonCardTitle>Medicine Management</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Easily manage all your medications in one place with detailed
                  dosage information.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard>
                <IonCardHeader>
                  <IonIcon
                    icon={time}
                    color="primary"
                    style={{ fontSize: "2rem" }}
                  />
                  <IonCardTitle>Schedule Tracking</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Set up customized schedules for each medication with flexible
                  recurring options.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard>
                <IonCardHeader>
                  <IonIcon
                    icon={notifications}
                    color="primary"
                    style={{ fontSize: "2rem" }}
                  />
                  <IonCardTitle>Smart Reminders</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Get timely reminders to never miss your medication schedule.
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6" sizeLg="3">
              <IonCard>
                <IonCardHeader>
                  <IonIcon
                    icon={peopleCircle}
                    color="primary"
                    style={{ fontSize: "2rem" }}
                  />
                  <IonCardTitle>User Friendly</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Simple and intuitive interface for users of all ages.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <style>
          {`
            .hero-section {
              background: linear-gradient(to right, var(--ion-color-primary), var(--ion-color-secondary));
              color: white;
              padding: 4rem 1rem;
              border-radius: 0 0 2rem 2rem;
              margin-bottom: 2rem;
            }

            .hero-section h1 {
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
            }

            .hero-section p {
              font-size: 1.2rem;
              margin-bottom: 2rem;
            }

            ion-card {
              height: 100%;
              border-radius: 1rem;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            ion-card-header {
              text-align: center;
            }

            ion-card-title {
              font-size: 1.2rem;
              margin-top: 1rem;
            }

            ion-card-content {
              text-align: center;
              padding: 1rem;
            }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default Home;
