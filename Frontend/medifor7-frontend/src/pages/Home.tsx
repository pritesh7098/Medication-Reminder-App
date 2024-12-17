// Landing page for everyone who visites website.
import {
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router";
import {
  timerOutline,
  medkitOutline,
  peopleOutline,
  notificationsOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Your Personal Medicine Companion</h1>
            <p className="hero-subtitle">
              Never miss a dose with smart reminders and easy medication
              tracking
            </p>
            <div className="hero-buttons">
              <IonButton
                size="large"
                className="get-started-btn"
                onClick={() => history.push("/register")}
              >
                Get Started
                <IonIcon icon={checkmarkCircleOutline} slot="end" />
              </IonButton>
              <IonButton
                size="large"
                fill="outline"
                className="login-btn"
                onClick={() => history.push("/login")}
              >
                Sign In
              </IonButton>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Choose MediFor7?</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <IonIcon icon={medkitOutline} />
                  </div>
                  <h3>Medicine Management</h3>
                  <p>Easily manage all your medications in one secure place</p>
                </div>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <IonIcon icon={timerOutline} />
                  </div>
                  <h3>Smart Scheduling</h3>
                  <p>Set custom schedules with flexible recurring options</p>
                </div>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <IonIcon icon={notificationsOutline} />
                  </div>
                  <h3>Timely Reminders</h3>
                  <p>Get notifications when it's time to take your medicine</p>
                </div>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <div className="feature-card">
                  <div className="feature-icon">
                    <IonIcon icon={peopleOutline} />
                  </div>
                  <h3>Family Sharing</h3>
                  <p>Help manage medications for your loved ones</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section">
          <h2>Start Your Health Journey Today</h2>
          <p>
            Join thousands who trust MediFor7 for their medication management
          </p>
          <IonButton
            size="large"
            className="cta-button"
            onClick={() => history.push("/register")}
          >
            Create Free Account
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
